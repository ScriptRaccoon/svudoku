<script lang="ts">
	import { createEventDispatcher } from "svelte"
	const dispatch = createEventDispatcher()
</script>

<menu>
	<button on:click={() => dispatch("reset")}>Reset</button>
	<button on:click={() => dispatch("new")}>New</button>
</menu>

<style>
	menu {
		padding-top: 1.5rem;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
