<script lang="ts">
	import { pencil_active } from "$lib/stores"
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()

	import clearIcon from "$lib/assets/clear.svg"
	import undoIcon from "$lib/assets/undo.svg"
</script>

<menu>
	<button class="button" on:click={() => dispatch("undo")}>
		<img class="undo" src={undoIcon} alt="undo" />
	</button>
	{#each { length: 10 } as _, digit}
		<button
			class="button"
			on:click={() => dispatch("digit", digit)}
		>
			{#if digit >= 1}
				<span>{digit}</span>
			{:else}
				<img class="clear" src={clearIcon} alt="clear" />
			{/if}
		</button>
	{/each}
</menu>

<menu>
	<div>
		<button class="button" on:click={() => dispatch("reset")}
			>Reset</button
		>
		<button class="button" on:click={() => dispatch("new")}
			>New</button
		>
	</div>
	<label
		for="pencil_checkbox"
		class="pencil_label"
		class:active={$pencil_active}
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
		margin-top: 1.5rem;
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		width: min(80vmin, 30rem);
		margin-inline: auto;
	}

	.clear {
		width: 1rem;
	}

	.undo {
		width: 1rem;
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
