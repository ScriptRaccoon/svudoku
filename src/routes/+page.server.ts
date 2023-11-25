import { parse_line, random_element } from "$lib/utils.js"
import { error, redirect } from "@sveltejs/kit"
import db from "$lib/db.json"
import { LINE_REGEXP, MODES, MODE_DEFAULT } from "$lib/config.js"

export const load = async (event) => {
	const line = event.url.searchParams.get("q")
	if (line) {
		const original = parse_line(line)
		if (original) return { original }
		throw error(400, "Invalid query parameter")
	}
	let mode = MODE_DEFAULT
	const query_mode = event.url.searchParams.get("mode")
	if (query_mode && MODES.includes(query_mode)) {
		mode = query_mode
	}
	const random_line = random_element(db[mode as "easy" | "hard"])
	if (!random_line.match(LINE_REGEXP))
		throw error(500, "Invalid database entry")
	throw redirect(303, `/?q=${random_line}`)
}
