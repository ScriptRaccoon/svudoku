<script lang="ts">
	import { invalid_digits } from "$lib/stores"
	$: term = $invalid_digits.size > 1 ? "digits" : "digit"
</script>

<div aria-live="polite">
	{#if $invalid_digits.size}
		<p class="error">
			Oups! There is a conflict with the {term}
			{[...$invalid_digits].sort().toString()}.
		</p>
	{/if}
</div>

<style>
	.error {
		font-weight: bold;
		color: var(--error-color);
		padding-top: 1rem;
	}
</style>
