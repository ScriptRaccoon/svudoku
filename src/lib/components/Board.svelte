<script lang="ts">
	export let board: Record<string, number>
	export let original: Record<string, number>
	export let pencil_board: Record<string, Set<number>>

	import Square from "./Square.svelte"
	import Popup from "./Popup.svelte"
	import { is_solved, is_valid } from "$lib/utils"
	import { error_message, selected_coord } from "$lib/stores"
	import { peers_dict } from "$lib/peers"
	import { coordinates, initial_valid_board, to_coord } from "$lib/config"

	$: solved = is_solved(board)
	$: selected_number = $selected_coord ? board[$selected_coord] : null

	let valid_board: Record<string, boolean> = initial_valid_board

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

<div class="board">
	{#each { length: 3 } as _, block_row}
		{#each { length: 3 } as _, block_col}
			<div class="block">
				{#each { length: 3 } as _, row_offset}
					{#each { length: 3 } as _, col_offset}
						{@const row = 3 * block_row + row_offset}
						{@const col = 3 * block_col + col_offset}
						{@const coord = to_coord(row, col)}
						<Square
							bind:digit={board[coord]}
							bind:marks={pencil_board[coord]}
							fixed={original[coord] >= 1}
							valid={valid_board[coord]}
							selected={coord == $selected_coord}
							highlighted={!!$selected_coord &&
								peers_dict[$selected_coord].includes(coord)}
							colored={board[coord] >= 1 && board[coord] == selected_number}
							on:select={() => ($selected_coord = coord)}
							{coord}
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
