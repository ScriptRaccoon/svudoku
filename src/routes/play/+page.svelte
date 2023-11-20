<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import { generate_empty_pencil_board } from "$lib/utils"

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	let pencil_board = generate_empty_pencil_board()

	function reset() {
		board = JSON.parse(JSON.stringify(original))
		pencil_board = generate_empty_pencil_board()
	}

	function new_board() {
		goto("/play")
	}

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}
</script>

<Board bind:board {original} bind:pencil_board />
<Menu on:reset={reset} on:new={new_board} />
