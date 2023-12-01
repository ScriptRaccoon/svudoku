import type { PageServerLoad } from "./$types"
import { error, redirect } from "@sveltejs/kit"
import { parse_line, random_element, shuffle_line } from "$lib/utils.js"
import db from "$lib/db.json"
import { LINE_REGEXP, empty_line } from "$lib/config.js"

export const load: PageServerLoad = async (event) => {
	const mode = event.url.searchParams.get("mode")
	if (mode === "create") {
		throw redirect(303, `/?q=${empty_line}`)
	}

	const line = event.url.searchParams.get("q")
	if (line) {
		const original = parse_line(line)
		if (original) return { original, creating: line === empty_line }
		throw error(400, "Invalid query parameter")
	}

	const random_line = random_element(db)
	if (!random_line.match(LINE_REGEXP))
		throw error(500, "Invalid database entry")
	const shuffled_line = shuffle_line(random_line)
	throw redirect(303, `/?q=${shuffled_line}`)
}
