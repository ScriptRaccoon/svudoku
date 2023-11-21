import { parse_line, random_element } from "$lib/utils.js"
import { error, redirect } from "@sveltejs/kit"
import db from "$lib/db.json"
import { LINE_REGEXP } from "$lib/config.js"

export const load = async (event) => {
	const line = event.url.searchParams.get("q")
	if (line) {
		const original = parse_line(line)
		if (original) return { original }
		throw error(400, "Invalid query parameter")
	}
	const random_line = random_element(db)
	if (!random_line.match(LINE_REGEXP))
		throw error(500, "Invalid database entry")
	throw redirect(303, `/play?q=${random_line}`)
}
