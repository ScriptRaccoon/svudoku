<script lang="ts">
	export let text = ""
</script>

{#if text.length > 0}
	<div class="overlay" />
{/if}

<dialog open={text.length > 0} on:close={() => (text = "")}>
	<p>
		{text}
	</p>
	<form method="dialog">
		<button>Ok</button>
	</form>
</dialog>

<style>
	dialog {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border: none;
		box-shadow: 0rem 0rem 1rem #0005;
		padding: 1rem;
		border-radius: 0.25rem;
		z-index: 20;
	}

	dialog > p {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	dialog > form {
		text-align: center;
	}

	.overlay {
		position: absolute;
		inset: 0;
		z-index: 10;
		background-color: #0002;
	}
</style>
