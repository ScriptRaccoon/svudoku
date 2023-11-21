<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	import clearIcon from "$lib/assets/clear.svg"
	import undoIcon from "$lib/assets/undo.svg"
	import pencilIcon from "$lib/assets/pencil.svg"
	import { pencil_active } from "$lib/stores"
</script>

<menu>
	{#each { length: 9 } as _, index}
		{@const digit = index + 1}

		<button
			class="button digit"
			on:click={() => dispatch("digit", digit)}
		>
			{digit}
		</button>
	{/each}
</menu>

<menu>
	<button class="button" on:click={() => dispatch("reset")}
		>Reset</button
	>
	<button class="button" on:click={() => dispatch("new")}
		>New</button
	>
	<button class="button" on:click={() => dispatch("undo")}>
		<img src={undoIcon} alt="undo" />
	</button>
	<button class="button" on:click={() => dispatch("digit", 0)}>
		<img src={clearIcon} alt="clear" />
	</button>
	<button
		class:active={$pencil_active}
		class="button pencil_button"
		on:click={() => dispatch("toggle_pencil")}
	>
		<span class="label">Pencil marks</span>
		<span>
			{#if $pencil_active}
				on
			{:else}
				off
			{/if}
		</span>
		<img src={pencilIcon} alt="pencil" />
	</button>
</menu>

<style>
	menu {
		display: flex;
		align-items: stretch;
		width: min(80vmin, 30rem);
		margin-inline: auto;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	menu:first-of-type {
		margin-block: 1.5rem 1rem;
		justify-content: space-between;
	}

	button img {
		width: 1rem;
	}

	.pencil_button {
		display: flex;
		gap: 0.25rem;
		margin-left: auto;
	}

	.pencil_button:not(.active) {
		background-color: var(--select-color);
	}

	@media (max-width: 32rem) {
		menu:first-of-type {
			gap: 0.1rem;
		}

		.pencil_button .label {
			display: none;
		}

		button.digit {
			display: flex;
			align-items: center;
			aspect-ratio: 1;
			padding: 0.5rem;
		}
		button:not(.digit) {
			padding: 0.2rem 0.4rem;
		}
	}
</style>
