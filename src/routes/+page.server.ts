import type { PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { parse_line, random_element } from "$lib/utils.js"
import db from "$lib/db.json"
import { LINE_REGEXP, DIFFICULTIES, DIFFICULTY_DEFAULT } from "$lib/config.js"

export const load: PageServerLoad = async (event) => {
	const line = event.url.searchParams.get("q")
	if (line) {
		const original = parse_line(line)
		if (original) return { original }
		throw error(400, "Invalid query parameter")
	}
	let difficulty = DIFFICULTY_DEFAULT
	const query_difficulty = event.url.searchParams.get("d")
	if (query_difficulty && DIFFICULTIES.includes(query_difficulty)) {
		difficulty = query_difficulty
	}
	const random_line = random_element(db[difficulty as "easy" | "hard"])
	if (!random_line.match(LINE_REGEXP))
		throw error(500, "Invalid database entry")
	throw redirect(303, `/?q=${random_line}`)
}
