// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			original: Record<string, number>
		}
		// interface Platform {}
	}
}

export {}
