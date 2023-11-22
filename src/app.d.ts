// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type board_type = number[][]
	type marks_type = Set<number>
	type pencil_board_type = marks_type[][]
	type coord_type = [number, number]
}

export {}
