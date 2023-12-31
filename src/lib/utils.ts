import { browser } from "$app/environment"
import { LINE_REGEXP, coordinates } from "./config"
import { peers_dict } from "./peers"

export function is_valid(
	coord: string,
	digit: number,
	board: Record<string, number>
): boolean {
	if (digit === 0) return true
	return peers_dict[coord].every((peer) => board[peer] != digit)
}

export function is_solved(board: Record<string, number>): boolean {
	return coordinates.every(
		(coord) => board[coord] >= 1 && is_valid(coord, board[coord], board)
	)
}

export function parse_line(line: string): Record<string, number> | null {
	if (!line.match(LINE_REGEXP)) return null
	const entries = coordinates.map((coord) => {
		const [row, col] = coord.split("").map(Number)
		const digit = Number(line[9 * row + col])
		return [coord, digit]
	})
	return Object.fromEntries(entries)
}

export function convert_to_line(board: Record<string, number>): string {
	let line = ""
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const char = board[String(row) + String(col)]
			line += char
		}
	}
	return line
}

export function display_value(digit: number): string {
	return digit == 0 ? "" : String(digit)
}

function random_int(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random())
}

export function random_element<T>(list: T[]): T {
	return list[random_int(0, list.length)]
}

function swap<T>(array: T[], i: number, j: number): void {
	// prettier-ignore
	[array[i], array[j]] = [array[j], array[i]]
}

function shuffle<T>(array: T[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = random_int(0, i + 1)
		swap(array, i, j)
	}
}

export function shuffle_line(line: string): string {
	const positive_digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
	shuffle(positive_digits)
	const digits = [0, ...positive_digits]
	let shuffled_line = ""
	for (const char of line) {
		shuffled_line += String(digits[Number(char)])
	}
	return shuffled_line
}

export function get_stored_value<T>(options: { key: string; default: T }): T {
	if (browser) {
		const stored_string = window.localStorage.getItem(options.key)
		if (stored_string) return JSON.parse(stored_string)
	}
	return options.default
}

export function store_value<T>(options: { key: string; value: T }): void {
	if (!browser) return
	window.localStorage.setItem(options.key, JSON.stringify(options.value))
}
