<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import { DELETE_KEYS, DIGITS } from "$lib/config"
	import { pencil_active, selected_coord } from "$lib/stores"
	import { generate_empty_pencil_board } from "$lib/utils"

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	let pencil_board = generate_empty_pencil_board()

	function reset() {
		board = JSON.parse(JSON.stringify(original))
		pencil_board = generate_empty_pencil_board()
		$selected_coord = null
	}

	function new_board() {
		goto("/play")
	}

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}

	function set_digit(digit: number): void {
		if (!$selected_coord || !DIGITS.includes(digit)) return
		const [row, col] = $selected_coord
		if (original[row][col] >= 1) return

		if ($pencil_active) {
			const marks = pencil_board[row][col]
			if (digit === 0) {
				marks.clear()
			} else if (marks.has(digit)) {
				marks.delete(digit)
			} else {
				marks.add(digit)
			}
			pencil_board[row][col] = marks
		} else {
			board[row][col] = digit
			pencil_board[row][col].clear()
		}
	}

	function handle_keydown(e: KeyboardEvent): void {
		const { key } = e
		const digit = DELETE_KEYS.includes(key) ? 0 : parseInt(key)
		set_digit(digit)
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<Board bind:board {original} bind:pencil_board />
<Menu
	on:reset={reset}
	on:new={new_board}
	on:digit={(e) => set_digit(e.detail)}
/>
