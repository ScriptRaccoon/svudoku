<script lang="ts">
	export let board: board
	export let original: board

	import Square from "./Square.svelte"
	import Popup from "./Popup.svelte"
	import { is_valid } from "$lib/utils"
	import { coordinates } from "$lib/config"

	$: solved = coordinates.every(
		([row, col]) =>
			board[row][col] >= 1 &&
			is_valid(row, col, board[row][col], board)
	)
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
							bind:value={board[row][col]}
							fixed={original[row][col] >= 1}
							valid={is_valid(
								row,
								col,
								board[row][col],
								board
							)}
							label={`row ${row + 1}, column ${
								col + 1
							}`}
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
