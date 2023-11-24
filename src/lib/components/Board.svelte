<script lang="ts">
	export let board: board_type
	export let original: board_type
	export let pencil_board: pencil_board_type

	import Square from "./Square.svelte"
	import Popup from "./Popup.svelte"
	import {
		generate_empty_valid_board,
		is_solved,
		is_valid,
	} from "$lib/utils"
	import { error_message, selected_coord } from "$lib/stores"
	import { peers_dict } from "$lib/peers"

	$: solved = is_solved(board)
	$: selected_number = $selected_coord
		? board[$selected_coord[0]][$selected_coord[1]]
		: null

	let valid_board = generate_empty_valid_board()

	$: if (board) {
		update_valid_board()
	}

	function update_valid_board() {
		const invalid_digits = new Set()
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				const digit = board[row][col]
				const valid = is_valid(row, col, digit, board)
				valid_board[row][col] = valid
				if (!valid) {
					invalid_digits.add(digit)
				}
			}
		}
		if (invalid_digits.size) {
			$error_message =
				"Oups! There is a conflict with the digit(s) " +
				[...invalid_digits].sort().toString()
		}
	}
</script>

<div class="board">
	{#each { length: 3 } as _, block_row}
		{#each { length: 3 } as _, block_col}
			<div class="block">
				{#each { length: 3 } as _, row_offset}
					{#each { length: 3 } as _, col_offset}
						{@const row = 3 * block_row + row_offset}
						{@const col = 3 * block_col + col_offset}
						<Square
							bind:digit={board[row][col]}
							bind:marks={pencil_board[row][col]}
							fixed={original[row][col] >= 1}
							valid={valid_board[row][col]}
							selected={$selected_coord?.toString() ==
								[row, col].toString()}
							highlighted={!!$selected_coord &&
								peers_dict[
									$selected_coord.toString()
								].includes([row, col].toString())}
							colored={board[row][col] >= 1 &&
								board[row][col] == selected_number}
							on:select={() =>
								($selected_coord = [row, col])}
						/>
					{/each}
				{/each}
			</div>
		{/each}
	{/each}
</div>

<Popup text={solved ? "Solved!" : ""} />

<style>
	.board {
		aspect-ratio: 1;
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		background-color: var(--grid-color-dark);
		gap: min(0.4vmin, 2px);
		padding: min(0.4vmin, 2px);
	}

	.block {
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		gap: min(0.2vmin, 1px);
		background-color: var(--grid-color-light);
	}
</style>
