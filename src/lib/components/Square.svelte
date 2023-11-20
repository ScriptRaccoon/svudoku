<script lang="ts">
	import { pencil_active } from "$lib/stores"
	import { display_value } from "$lib/utils"

	export let value: number
	export let fixed: boolean
	export let valid: boolean = true
	export let label: string
	export let marks: number[] = []

	function handle_pencil_mark(e: Event, num: number) {
		console.log("old marks", marks)
		//@ts-ignore
		if (e.target?.checked) {
			marks = [...marks, num]
		} else {
			marks = marks.filter((n) => n != num)
		}
		console.log("new marks", marks)
	}

	const digits = "123456789".split("")

	let input_element: HTMLInputElement

	function select(): void {
		input_element?.select()
	}

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

{#if $pencil_active && value == 0}
	<div class="square">
		<div class="marks">
			{#each { length: 9 } as _, index}
				{@const num = index + 1}
				<label
					class="mark"
					class:visible={marks.includes(num)}
				>
					<input
						type="checkbox"
						on:change={(e) => handle_pencil_mark(e, num)}
					/>
					<span>{num}</span>
				</label>
			{/each}
		</div>
	</div>
{:else}
	<input
		type="text"
		class="square"
		class:fixed
		class:invalid={!valid}
		bind:this={input_element}
		value={display_value(value)}
		on:change={change}
		on:focus={select}
		disabled={fixed || $pencil_active}
		aria-label={label}
	/>
{/if}

<style>
	.square {
		text-align: center;
		width: 100%;
		height: 100%;
		font-weight: 600;
		font-size: 1.4rem;
		background-color: var(--square-color);
	}

	.square.fixed {
		background-color: var(--lightgray-color);
	}

	.square.invalid {
		color: var(--error-color);
	}

	.marks {
		width: 100%;
		height: 100%;
		font-weight: initial;
		font-size: 0.8rem;
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
	}

	.marks input[type="checkbox"] {
		position: absolute;
		left: -100vw;
		width: 10px;
		height: 1px;
		overflow: hidden;
	}

	.mark {
		cursor: pointer;
		opacity: 0;
	}

	.mark:hover {
		opacity: 0.4;
	}

	.mark.visible {
		opacity: 0.85;
	}
</style>
