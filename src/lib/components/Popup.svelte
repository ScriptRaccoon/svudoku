<script lang="ts">
	import { popup } from "$lib/stores"

	function confirm() {
		if ($popup?.action) $popup.action()
		cancel()
	}

	function cancel() {
		$popup = null
	}
</script>

{#if $popup?.text}
	<div class="overlay" />
{/if}

<dialog open={Boolean($popup)}>
	<p>
		{$popup?.text}
	</p>
	<menu>
		<button class="button" on:click={confirm}>Ok</button>
		{#if $popup?.action}
			<button class="button" on:click={cancel}>Cancel</button>
		{/if}
	</menu>
</dialog>

<style>
	dialog {
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		border: none;
		box-shadow: 0rem 0rem 1rem #0005;
		padding: 1.25rem;
		border-radius: 0.25rem;
		z-index: 20;
		text-align: center;
		width: min(90vmin, 20rem);
	}

	dialog > p {
		font-size: 1.5rem;
	}

	menu {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}

	.overlay {
		position: absolute;
		inset: 0;
		z-index: 10;
		background-color: #0004;
	}
</style>
