<script lang="ts">
	import Fa from "svelte-fa"
	import { faCopy, faGear } from "@fortawesome/free-solid-svg-icons"
	import { createEventDispatcher } from "svelte"
	export let creating: boolean
	const icon_color = "#555"

	const dispatch = createEventDispatcher()
</script>

<div class="menu">
	{#if creating}
		<button aria-label="copy URL" on:click={() => dispatch("copy")}>
			<Fa icon={faCopy} color={icon_color} />
		</button>
	{/if}
	<button
		aria-label="show settings"
		class="settings_button"
		on:click={() => dispatch("show_settings")}
	>
		<Fa icon={faGear} color={icon_color} />
	</button>
</div>

<style>
	.menu {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.4rem;
	}

	.settings_button {
		margin-left: auto;
	}
</style>
