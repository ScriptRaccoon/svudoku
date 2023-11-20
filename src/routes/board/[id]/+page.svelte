<script lang="ts">
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import { BOARD_COUNT } from "$lib/config"
	import { rand_int } from "$lib/utils"

	const { original, solution } = $page.data

	let board = JSON.parse(JSON.stringify(original))

	function reset() {
		board = JSON.parse(JSON.stringify(original))
	}

	function new_board() {
		const id = 1 + rand_int(0, BOARD_COUNT)
		const url = `/board/${id}`
		window.location.href = url
	}
</script>

<Board bind:board {original} {solution} />
<Menu on:reset={reset} on:new={new_board} />
