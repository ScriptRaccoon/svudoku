<script lang="ts">
	import Fa from "svelte-fa"
	import { faGear } from "@fortawesome/free-solid-svg-icons"
	import { show_settings } from "$lib/stores"
</script>

<div class="menu">
	<button on:click={() => ($show_settings = true)}>
		<Fa icon={faGear} color="#555" />
	</button>
</div>

<style>
	.menu {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 0.4rem;
	}
</style>
