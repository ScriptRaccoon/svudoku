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

export function display_value(digit: number): string {
	return digit == 0 ? "" : String(digit)
}

function random_int(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random())
}

export function random_element<T>(list: T[]): T {
	return list[random_int(0, list.length)]
}

export function candidates_to_str(candidates: Set<number>): string {
	return [...candidates].join("")
}

export function str_to_candidates(str: string): Set<number> {
	return new Set(str.split("").map((e) => Number(e)))
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
