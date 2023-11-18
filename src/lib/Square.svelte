<script lang="ts">
	import { display_value } from "./utils"

	export let value: number
	export let fixed: boolean
	export let valid: boolean = true
	export let label: string

	const digits = "123456789".split("")

	let input_element: HTMLInputElement

	/**
	 * selects the input element
	 */
	function select(): void {
		input_element?.select()
	}

	/**
	 * changes the board value if the input field has a valid new value
	 */
	function change(): void {
		const new_value = input_element?.value
		if (new_value === "") {
			value = 0
		} else if (digits.includes(new_value)) {
			value = parseInt(new_value)
		} else {
			input_element.value = display_value(value)
		}
	}
</script>

<input
	type="text"
	class="square"
	class:fixed
	class:invalid={!valid}
	bind:this={input_element}
	value={display_value(value)}
	on:change={change}
	on:focus={select}
	disabled={fixed}
	aria-label={label}
/>

<style>
	.square {
		text-align: center;
		width: 100%;
		height: 100%;
		font-weight: 600;
		font-size: 1.4rem;
		background-color: #fff;
	}

	.square.fixed {
		background-color: #eee;
	}

	.square.invalid {
		color: var(--error-color);
	}
</style>
