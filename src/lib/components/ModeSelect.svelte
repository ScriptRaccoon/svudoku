<script lang="ts">
	import { MODES, MODE_DEFAULT } from "$lib/config"

	export let mode = MODE_DEFAULT
</script>

<select aria-label="mode" on:change bind:value={mode}>
	{#each MODES as _mode}
		<option value={_mode}>{_mode}</option>
	{/each}
</select>

<style>
	select {
		display: block;
		margin-bottom: 0.25rem;
	}
</style>
