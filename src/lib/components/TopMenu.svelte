<script lang="ts">
	import Fa from "svelte-fa"
	import { DIFFICULTIES, DIFFICULTY_DEFAULT } from "$lib/config"
	import { faGear } from "@fortawesome/free-solid-svg-icons"

	export let difficulty = DIFFICULTY_DEFAULT
</script>

<div class="menu">
	<select aria-label="difficulty" on:change bind:value={difficulty}>
		{#each DIFFICULTIES as _difficulty}
			<option value={_difficulty}>{_difficulty}</option>
		{/each}
	</select>

	<a href="/settings">
		<Fa icon={faGear} color="#555" />
	</a>
</div>

<style>
	.menu {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.4rem;
	}
</style>
