<script lang="ts">
	import { browser } from "$app/environment"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Errors from "$lib/components/Errors.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import ModeSelect from "$lib/components/ModeSelect.svelte"
	import Popup from "$lib/components/Popup.svelte"
	import {
		ACTION_TYPE,
		DELETE_KEYS,
		DIGITS,
		MARK_LIMIT,
		MODE_DEFAULT,
		PENCIL_KEYS,
		coordinates,
		initial_valid_board
	} from "$lib/config"
	import { pencil_active, selected_coord, error_message } from "$lib/stores"
	import { is_solved, is_valid, marks_to_str, str_to_marks } from "$lib/utils"
	import { onDestroy, onMount, tick } from "svelte"

	let actions: string[] = []

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	let pencil_board: Record<string, Set<number>> = Object.fromEntries(
		coordinates.map((coord) => [coord, new Set()])
	)

	let can_place_digit = false
	let can_undo = false
	let app: HTMLElement
	let mode = MODE_DEFAULT
	let valid_board: Record<string, boolean> = initial_valid_board

	$: solved = is_solved(board)

	$: {
		if (!$selected_coord) {
			can_place_digit = false
		} else {
			can_place_digit =
				original[$selected_coord] === 0 &&
				(!$pencil_active || board[$selected_coord] === 0)
		}
	}

	function reset(confirm = false) {
		if (confirm) {
			if (!window.confirm("Do you really want to reset the game?")) return
		}

		for (const coord of coordinates) {
			board[coord] = original[coord]
			pencil_board[coord] = new Set()
		}
		$selected_coord = null
		$error_message = ""
		actions = []
		can_undo = false
	}

	function load_new_board() {
		if (!window.confirm("Do you really want to start a new game?")) return
		goto(`/?mode=${mode}`)
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

	function handle_click(e: MouseEvent) {
		if (!app?.contains(e.target as HTMLElement)) $selected_coord = null
	}

	onMount(() => {
		if (browser) document.addEventListener("click", handle_click)
	})

	onDestroy(() => {
		if (browser) document.removeEventListener("click", handle_click)
	})

	async function change_mode() {
		await tick()
		load_new_board()
	}

	$: if (board) {
		update_valid_board()
	}

	function update_valid_board() {
		const invalid_digits = new Set()
		for (const coord of coordinates) {
			const digit = board[coord]
			const valid = is_valid(coord, digit, board)
			valid_board[coord] = valid
			if (!valid) {
				invalid_digits.add(digit)
			}
		}
		if (invalid_digits.size) {
			$error_message =
				"Oups! There is a conflict with the digit(s) " +
				String(Array.from(invalid_digits).sort())
		}
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<div bind:this={app}>
	<ModeSelect on:change={change_mode} bind:mode />
	<Board bind:board {original} bind:pencil_board {valid_board} />
	<Popup text={solved ? "Solved!" : ""} />
	<Errors />

	<Menu
		on:reset={() => reset(true)}
		on:new={load_new_board}
		on:digit={(e) => set_digit(e.detail)}
		on:undo={undo}
		on:toggle_pencil={toggle_pencil}
		{can_place_digit}
		{can_undo}
	/>
</div>
