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
