<script lang="ts">
	import Square from "./Square.svelte"
	import { selected_coord, show_highlights } from "$lib/stores"
	import { peers_dict } from "$lib/peers"
	import { to_coord } from "$lib/config"

	export let board: Record<string, number>
	export let original: Record<string, number>
	export let candidate_board: Record<string, Set<number>>
	export let validity_board: Record<string, boolean>

	$: selected_number = $selected_coord ? board[$selected_coord] : null
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
							bind:candidates={candidate_board[coord]}
							valid={validity_board[coord]}
							selected={coord == $selected_coord}
							highlighted={$show_highlights &&
								!!$selected_coord &&
								peers_dict[$selected_coord].includes(coord)}
							current_number={$show_highlights &&
								board[coord] >= 1 &&
								board[coord] == selected_number}
							on:select={() => ($selected_coord = coord)}
							{coord}
						/>
					{/each}
				{/each}
			</div>
		{/each}
	{/each}
</div>

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
