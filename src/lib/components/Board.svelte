<script lang="ts">
	export let board: board_type
	export let original: board_type
	export let pencil_board: pencil_board_type

	import Square from "./Square.svelte"
	import Popup from "./Popup.svelte"
	import { is_solved, is_valid } from "$lib/utils"
	import { selected_coord } from "$lib/stores"
	import { peers_dict } from "$lib/peers"

	$: solved = is_solved(board)
	$: selected_number = !$selected_coord
		? null
		: board[$selected_coord[0]][$selected_coord[1]]
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
							valid={is_valid(
								row,
								col,
								board[row][col],
								board
							)}
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
		margin-inline: auto;
		--size: min(80vmin, 30rem);
		width: var(--size);
		height: var(--size);
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		background-color: black;
		gap: 2px;
		padding: 2px;
	}

	.block {
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		gap: 1px;
	}
</style>
