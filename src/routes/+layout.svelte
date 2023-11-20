<script>
	import { page } from "$app/stores"
	import Header from "$lib/Header.svelte"
	import "./app.css"

	$: title = $page.data.title ?? "Sudoku"
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Header {title} />

<main>
	<slot />
</main>
