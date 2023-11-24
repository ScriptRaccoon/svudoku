<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	import clearIcon from "$lib/assets/clear.svg"
	import undoIcon from "$lib/assets/undo.svg"
	import pencilIcon from "$lib/assets/pencil.svg"
	import { pencil_active } from "$lib/stores"
</script>

<menu class="digits">
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

<menu class="actions">
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
		flex-wrap: wrap;
	}

	menu.digits {
		margin-block: 1.5rem 1rem;
		justify-content: space-between;
	}

	menu.actions {
		gap: 0.5rem;
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
		.pencil_button .label {
			display: none;
		}

		button {
			padding: 0.3rem 0.6rem;
		}

		menu.actions {
			font-size: 0.85rem;
		}
	}
</style>
