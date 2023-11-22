<script>
	import { page } from "$app/stores"
	import Header from "$lib/components/Header.svelte"
	import "./app.css"
</script>

<svelte:head>
	<title>Svudoku</title>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		margin-inline: auto;
		width: min(80vmin, 30rem);
	}
</style>
