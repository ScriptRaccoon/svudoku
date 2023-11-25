<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	import clearIcon from "$lib/assets/clear.svg"
	import undoIcon from "$lib/assets/undo.svg"
	import pencilIcon from "$lib/assets/pencil.svg"
	import { pencil_active } from "$lib/stores"
	export let can_place_digit = false
	export let can_undo = false
</script>

<menu class="digits">
	{#each { length: 9 } as _, index}
		{@const digit = index + 1}

		<button
			disabled={!can_place_digit}
			class="button digit"
			on:click={() => dispatch("digit", digit)}
		>
			{digit}
		</button>
	{/each}
</menu>

<menu class="actions">
	<button class="button" on:click={() => dispatch("reset")}>Reset</button>
	<button class="button" on:click={() => dispatch("new")}>New</button>
	<button disabled={!can_undo} class="button" on:click={() => dispatch("undo")}>
		<img src={undoIcon} alt="undo" />
	</button>
	<button
		disabled={!can_place_digit}
		class="button"
		on:click={() => dispatch("digit", 0)}
	>
		<img src={clearIcon} alt="erase" />
	</button>
	<button
		class="button pencil_button"
		on:click={() => dispatch("toggle_pencil")}
	>
		Pencil
		<span>
			{#if $pencil_active}
				on
			{:else}
				off
			{/if}
		</span>
		<img
			class:active={$pencil_active}
			class="pencil_icon"
			src={pencilIcon}
			alt="pencil"
		/>
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
		margin-left: auto;
	}

	.pencil_icon {
		display: inline-block;
		opacity: 0.3;
	}

	.pencil_icon.active {
		opacity: 1;
	}

	@media (max-width: 32rem) {
		button {
			padding: 0.3rem 0.6rem;
		}

		menu.actions {
			font-size: 0.85rem;
		}
	}
</style>
