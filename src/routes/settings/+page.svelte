<script lang="ts">
	import { show_highlights, show_conflicts } from "$lib/stores"

	function go_back() {
		window.history.back()
	}
</script>

<h2>Settings</h2>

<section aria-label="toggles">
	<p class="toggle">
		<input
			type="checkbox"
			id="highlight_checkbox"
			bind:checked={$show_highlights}
		/>
		<label for="highlight_checkbox">Show highlights</label>
	</p>

	<div class="toggle">
		<input
			type="checkbox"
			id="conflict_checkbox"
			bind:checked={$show_conflicts}
		/>
		<label for="conflict_checkbox">Warn about conflicting numbers</label>
	</div>
</section>

<p class="end">
	<button class="button" on:click={go_back}>Go back</button>
</p>

<style>
	h2 {
		margin-bottom: 2rem;
	}

	.toggle {
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
	}

	.end {
		margin-top: 2rem;
	}
</style>
