import db from "$lib/db.json"
import { error } from "@sveltejs/kit"

export const load = async (event) => {
	const id = parseInt(event.params.id)
	if (id >= 1 && id <= db.length) {
		const { original, solution } = db[id - 1]
		return { id, original, solution, title: `Sudoku #${id}` }
	}
	throw error(404, "No board was found")
}
