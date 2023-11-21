// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type board = number[][]
	type marks = Set<number>
	type pencil_board = marks[][]
	type coord = [number, number]
}

export {}
