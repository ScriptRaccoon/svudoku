<script lang="ts">
	import { display_value } from "$lib/utils"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()

	export let digit: number
	export let marks: marks = new Set([])
	export let fixed: boolean
	export let valid: boolean = true
	export let selected: boolean = false
	export let highlighted: boolean = false
	export let colored: boolean = false
</script>

<button
	class="square"
	on:click={() => dispatch("select")}
	class:fixed
	class:selected
	class:highlighted
	class:colored
	tabindex="-1"
>
	<div class="digit" class:invalid={!valid}>
		{display_value(digit)}
	</div>

	{#if digit == 0}
		<div class="marks">
			{#each { length: 9 } as _, index}
				{@const digit = index + 1}
				<span class="mark" class:visible={marks.has(digit)}>
					{digit}
				</span>
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
	}

	.square.fixed {
		background-color: var(--lightgray-color);
	}

	.square.selected {
		background-color: var(--select-color) !important;
	}

	.square.highlighted {
		background-color: var(--highlight-color) !important;
	}

	.square.colored {
		color: var(--primary-color);
	}

	.digit,
	.marks {
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

	.marks {
		font-size: min(0.8rem, 2vw);
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
	}

	.mark {
		opacity: 0;
	}

	.mark.visible {
		opacity: 0.85;
	}
</style>
