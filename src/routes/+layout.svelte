<script>
	import Header from "$lib/components/Header.svelte"
	import "../app.css"
</script>

<svelte:head>
	<title>Svudoku</title>
	<meta property="og:title" content="Svudoku" />
	<meta property="og:description" content="Sudoku app" />
	<meta name="description" content="Sudoku app" />
	<meta property="og:type" content="Website" />
	<meta property="og:url" content="https://svudoku.netlify.app" />
	<meta property="og:site_name" content="Svudoku" />
	<meta property="og:image" content="/svudoku.jpg" />

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		margin-inline: auto;
		width: min(95vmin, 30rem);
	}
</style>
