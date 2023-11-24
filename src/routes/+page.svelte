<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Errors from "$lib/components/Errors.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import {
		ACTION_TYPE,
		DELETE_KEYS,
		DIGITS,
		MARK_LIMIT,
		PENCIL_KEYS,
		coordinates
	} from "$lib/config"
	import { pencil_active, selected_coord, error_message } from "$lib/stores"
	import { marks_to_str, str_to_marks } from "$lib/utils"

	let actions: string[] = []

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	let pencil_board: Record<string, Set<number>> = Object.fromEntries(
		coordinates.map((coord) => [coord, new Set()])
	)

	let can_place_digit = false
	let can_undo = false

	$: {
		if (!$selected_coord) {
			can_place_digit = false
		} else {
			can_place_digit =
				original[$selected_coord] === 0 &&
				(!$pencil_active || board[$selected_coord] === 0)
		}
	}

	function reset() {
		for (const coord of coordinates) {
			board[coord] = original[coord]
			pencil_board[coord] = new Set()
		}
		$selected_coord = null
		$error_message = ""
		actions = []
		can_undo = false
	}

	function new_board() {
		goto("/")
	}

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}

	function set_digit(digit: number): void {
		if (!$selected_coord || !DIGITS.includes(digit)) return
		if (original[$selected_coord] >= 1) return
		const coord = $selected_coord

		$error_message = ""
		let action = ""
		if ($pencil_active) {
			if (board[coord] >= 1) return
			const marks = pencil_board[coord]
			const prev = marks_to_str(marks)
			if (digit === 0) {
				marks.clear()
			} else if (marks.has(digit)) {
				marks.delete(digit)
			} else if (marks.size < MARK_LIMIT) {
				marks.add(digit)
			} else {
				return
			}
			const next = marks_to_str(marks)
			action = `${ACTION_TYPE.PENCIL}:${coord}:${prev}:${next}`
			pencil_board[coord] = marks
		} else {
			action = `${ACTION_TYPE.BOARD}:${coord}:${board[coord]}:${digit}`
			board[coord] = digit
		}
		actions.push(action)
		can_undo = true
	}

	function handle_keydown(e: KeyboardEvent): void {
		const { key } = e
		if (PENCIL_KEYS.includes(key)) {
			$pencil_active = !$pencil_active
			return
		}
		const digit = DELETE_KEYS.includes(key) ? 0 : parseInt(key)
		set_digit(digit)
	}

	function undo() {
		$error_message = ""
		const action = actions.pop()
		if (!action) return
		const [type, coord, prev] = action.split(":")
		if (type === ACTION_TYPE.BOARD) {
			board[coord] = Number(prev)
		} else if (type === ACTION_TYPE.PENCIL) {
			pencil_board[coord] = str_to_marks(prev)
		}
		if (actions.length === 0) can_undo = false
	}

	function toggle_pencil() {
		$pencil_active = !$pencil_active
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<Board bind:board {original} bind:pencil_board />
<Errors></Errors>

<Menu
	on:reset={reset}
	on:new={new_board}
	on:digit={(e) => set_digit(e.detail)}
	on:undo={undo}
	on:toggle_pencil={toggle_pencil}
	{can_place_digit}
	{can_undo}
/>
