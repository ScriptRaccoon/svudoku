<script lang="ts">
	import { pencil_active } from "$lib/stores"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
</script>

<menu>
	<div>
		<button on:click={() => dispatch("reset")}>Reset</button>
		<button on:click={() => dispatch("new")}>New</button>
	</div>
	<label
		for="pencil_checkbox"
		class="pencil_label"
		class:active={pencil_active}
	>
		Pencil marks
		<input
			type="checkbox"
			bind:checked={$pencil_active}
			id="pencil_checkbox"
		/>
	</label>
</menu>

<style>
	menu {
		padding-top: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		width: min(80vmin, 30rem);
		margin-inline: auto;
	}

	.pencil_label {
		border: 0.1rem solid var(--lightgray-color);
		padding: 0.4rem 0.8rem;
		cursor: pointer;
		border-radius: 0.25rem;
		display: flex;
		gap: 0.75rem;
	}

	.pencil_label.active {
		background-color: var(--lightgray-color);
	}
</style>
