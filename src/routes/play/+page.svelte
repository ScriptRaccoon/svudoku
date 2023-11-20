<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Menu from "$lib/components/Menu.svelte"

	let original = $page.data.original
	let board = JSON.parse(JSON.stringify(original))

	function reset() {
		board = JSON.parse(JSON.stringify(original))
	}

	function new_board() {
		goto("/play")
	}

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}
</script>

<Board bind:board {original} />
<Menu on:reset={reset} on:new={new_board} />
