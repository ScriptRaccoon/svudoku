<script lang="ts">
	import { error_message } from "$lib/stores"
</script>

<div aria-live="polite">
	{#if $error_message}
		<p class="error">{$error_message}</p>
	{/if}
</div>

<style>
	.error {
		font-weight: bold;
		color: var(--error-color);
		padding-top: 1rem;
	}
</style>
