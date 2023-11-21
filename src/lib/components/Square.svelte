<script lang="ts">
	import { DIGITS } from "$lib/config"
	import { pencil_active } from "$lib/stores"
	import { display_value } from "$lib/utils"

	export let value: number
	export let fixed: boolean
	export let valid: boolean = true
	export let label: string
	export let marks: number[] = []
	let input_element: HTMLInputElement
	let show_marks = true

	function toggle_mark(e: Event, digit: number): void {
		if (!$pencil_active) return
		//@ts-ignore
		if (e.target?.checked) {
			marks = [...marks, digit]
		} else {
			marks = marks.filter((d) => d != digit)
		}
	}

	function select(): void {
		show_marks = false
		input_element?.select()
	}

	function change_value(): void {
		const new_value = input_element?.value
		if (new_value === "") {
			value = 0
		} else if (DIGITS.includes(new_value)) {
			value = parseInt(new_value)
		} else {
			input_element.value = display_value(value)
		}
	}

	$: if (value > 0) {
		marks = []
	}
</script>

<div class="square">
	{#if value == 0 && show_marks}
		<div class="marks">
			{#each { length: 9 } as _, index}
				{@const digit = index + 1}
				<label
					class="mark"
					class:checked={marks.includes(digit)}
					class:nopointer={!$pencil_active}
				>
					<input
						type="checkbox"
						class="vh"
						disabled={!$pencil_active}
						on:change={(e) => toggle_mark(e, digit)}
					/>
					<span>{digit}</span>
				</label>
			{/each}
		</div>
	{/if}

	<input
		bind:this={input_element}
		type="text"
		class="digit"
		class:fixed
		class:invalid={!valid}
		class:nopointer={$pencil_active}
		value={display_value(value)}
		disabled={fixed || $pencil_active}
		aria-label={label}
		on:change={change_value}
		on:focus={select}
		on:blur={() => (show_marks = true)}
	/>
</div>

<style>
	.square {
		background-color: var(--square-color);
		position: relative;
	}

	.digit,
	.marks {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.digit {
		font-weight: 600;
		font-size: 1.5rem;
		text-align: center;
	}

	.digit.fixed {
		background-color: var(--lightgray-color);
	}

	.digit.invalid {
		color: var(--error-color);
	}

	.marks {
		font-size: 0.8rem;
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
	}

	.mark {
		opacity: 0;
		text-align: center;
		cursor: pointer;
	}

	.mark:not(.checked):hover {
		opacity: 0.4;
	}

	.mark.checked {
		opacity: 0.85;
	}

	.nopointer {
		pointer-events: none;
	}
</style>
