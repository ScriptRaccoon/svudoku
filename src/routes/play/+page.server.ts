import { parse_line, random_element } from "$lib/utils.js"
import { error, redirect } from "@sveltejs/kit"

export const load = async (event) => {
	const line = event.url.searchParams.get("q")
	if (line) {
		const original = parse_line(line)
		if (original) return { original }
		throw error(400, "Invalid query parameter")
	}
	let random_line = ""
	try {
		const res = await event.fetch("/db.txt")
		const db = await res.text()
		const lines = db
			.split("\n")
			.filter((line) => !line.startsWith("#"))
			.map((line) => line.replace("\r", ""))
		random_line = random_element(lines)
	} catch (_) {
		throw error(500, "Database could not be loaded")
	}
	throw redirect(303, `/play?q=${random_line}`)
}
