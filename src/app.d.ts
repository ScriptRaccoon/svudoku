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
	type pencil_board = Set<number>[][]
	type coord = [number, number]
}

export {}
