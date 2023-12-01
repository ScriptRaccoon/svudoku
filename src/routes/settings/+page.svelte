<script lang="ts">
	function go_back() {
		window.history.back()
	}
</script>

<h2>Settings</h2>

<p class="end">
	<button class="button" on:click={go_back}>Go back</button>
</p>

<style>
	.end {
		margin-top: 1rem;
	}
</style>
