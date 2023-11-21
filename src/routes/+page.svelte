<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import { ACTION_TYPE, DELETE_KEYS, DIGITS } from "$lib/config"
	import { pencil_active, selected_coord } from "$lib/stores"
	import {
		marks_to_str,
		str_to_marks,
		generate_empty_pencil_board,
	} from "$lib/utils"

	let actions: string[] = []

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	let pencil_board = generate_empty_pencil_board()

	function reset() {
		board = JSON.parse(JSON.stringify(original))
		pencil_board = generate_empty_pencil_board()
		$selected_coord = null
		actions = []
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
		const [row, col] = $selected_coord
		if (original[row][col] >= 1) return

		let action = ""
		if ($pencil_active) {
			const marks = pencil_board[row][col]
			const prev = marks_to_str(marks)
			if (digit === 0) {
				marks.clear()
			} else if (marks.has(digit)) {
				marks.delete(digit)
			} else {
				marks.add(digit)
			}
			pencil_board[row][col] = marks
			const next = marks_to_str(marks)
			action = `${ACTION_TYPE.PENCIL}:${row}:${col}:${prev}:${next}`
		} else {
			action = `${ACTION_TYPE.BOARD}:${row}:${col}:${board[row][col]}:${digit}`
			board[row][col] = digit
		}
		actions.push(action)
	}

	function handle_keydown(e: KeyboardEvent): void {
		const { key } = e
		const digit = DELETE_KEYS.includes(key) ? 0 : parseInt(key)
		set_digit(digit)
	}

	function undo() {
		const action = actions.pop()
		if (!action) return
		const [type, ...data_str] = action.split(":")
		if (type === ACTION_TYPE.BOARD) {
			const [row, col, prev] = data_str.map((s) => parseInt(s))
			board[row][col] = prev
		} else if (type === ACTION_TYPE.PENCIL) {
			const row = parseInt(data_str[0])
			const col = parseInt(data_str[1])
			const prev_str = data_str[2]
			const marks = str_to_marks(prev_str)
			pencil_board[row][col] = marks
		}
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<Board bind:board {original} bind:pencil_board />
<Menu
	on:reset={reset}
	on:new={new_board}
	on:digit={(e) => set_digit(e.detail)}
	on:undo={undo}
/>
