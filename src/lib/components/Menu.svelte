<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
	import { edit_candidates } from "$lib/stores"
	export let can_place_digit = false
	export let can_undo = false
	import Fa from "svelte-fa"
	import {
		faEraser,
		faPencil,
		faRotateLeft
	} from "@fortawesome/free-solid-svg-icons"
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
		<Fa icon={faRotateLeft} />
	</button>
	<button
		disabled={!can_place_digit}
		class="button"
		on:click={() => dispatch("digit", 0)}
	>
		<Fa icon={faEraser} />
	</button>
	<button
		class="button candidates_button"
		on:click={() => dispatch("toggle_candidates")}
	>
		Candidates
		<span>
			{#if $edit_candidates}
				on
			{:else}
				off
			{/if}
		</span>
		<Fa icon={faPencil} color={$edit_candidates ? "#ffffff" : "#ffffff77"} />
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

	.candidates_button {
		margin-left: auto;
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
