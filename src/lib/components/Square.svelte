<script lang="ts">
	import { show_conflicts } from "$lib/stores"
	import { display_value } from "$lib/utils"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()

	export let digit: number
	export let candidates = new Set<number>()
	export let valid: boolean = true
	export let selected: boolean = false
	export let highlighted: boolean = false
	export let current_number: boolean = false
	export let coord: string
</script>

<button
	class="square"
	on:click={() => dispatch("select")}
	class:selected
	class:highlighted
	class:current_number
	tabindex="-1"
	aria-label="coordinate {coord}"
>
	<div class="digit" class:invalid={$show_conflicts && !valid}>
		{display_value(digit)}
	</div>

	{#if digit == 0}
		<div class="candidates">
			{#each candidates as candidate}
				<span>{candidate}</span>
			{/each}
		</div>
	{/if}
</button>

<style>
	.square {
		background-color: var(--square-color);
		cursor: pointer;
		display: grid;
		color: black;
		aspect-ratio: 1;
		align-items: center;
	}

	.square.selected {
		background-color: var(--select-color) !important;
	}

	.square.highlighted {
		background-color: var(--highlight-color) !important;
	}

	.square.current_number {
		background-color: var(--select-color) !important;
	}

	.digit,
	.candidates {
		grid-row: 1;
		grid-column: 1;
	}

	.digit {
		font-weight: 600;
		font-size: min(1.5rem, 7vw);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.digit.invalid {
		color: var(--error-color);
	}

	.candidates {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: start;
		padding: 0.1rem;
		width: 100%;
		height: 100%;
		overflow: hidden;
		column-gap: 0.6rem;
		opacity: 0.6;
	}

	@media (max-width: 32rem) {
		.candidates {
			column-gap: 0.1rem;
			font-size: 0.8rem;
		}
	}
</style>
