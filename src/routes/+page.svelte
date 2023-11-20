<script lang="ts">
	import { BOARD_COUNT } from "$lib/config"
	import { rand_int } from "$lib/utils"

	const random_id = 1 + rand_int(0, BOARD_COUNT)
</script>

<section>
	<a href="/board/{random_id}">Play random Sudoku</a>
</section>

<style>
	section {
		text-align: center;
	}
</style>
