<script lang="ts">
	import { show_highlights, show_conflicts, show_settings } from "$lib/stores"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()
</script>

<h2>Settings</h2>

<section aria-label="toggles">
	<div class="toggle">
		<input
			type="checkbox"
			id="highlight_checkbox"
			bind:checked={$show_highlights}
		/>
		<label for="highlight_checkbox">Show highlights</label>
	</div>

	<div class="toggle">
		<input
			type="checkbox"
			id="conflict_checkbox"
			bind:checked={$show_conflicts}
		/>
		<label for="conflict_checkbox">Warn about conflicting numbers</label>
	</div>

	<div>
		<button class="button" on:click={() => dispatch("create")}>
			Create Sudoku
		</button>
	</div>
</section>

<p class="end">
	<button class="button" on:click={() => ($show_settings = false)}>
		Go back
	</button>
</p>

<style>
	h2 {
		margin-bottom: 2rem;
	}

	.toggle {
		font-size: 1.25rem;
	}

	section > * {
		margin-bottom: 0.5rem;
	}

	.end {
		margin-top: 2rem;
	}
</style>
