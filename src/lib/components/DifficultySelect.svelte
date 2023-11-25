<script lang="ts">
	import { DIFFICULTIES, DIFFICULTY_DEFAULT } from "$lib/config"

	export let difficulty = DIFFICULTY_DEFAULT
</script>

<select aria-label="difficulty" on:change bind:value={difficulty}>
	{#each DIFFICULTIES as _difficulty}
		<option value={_difficulty}>{_difficulty}</option>
	{/each}
</select>

<style>
	select {
		display: block;
		margin-bottom: 0.25rem;
	}
</style>
