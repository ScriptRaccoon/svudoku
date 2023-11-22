import { LINE_REGEXP, coordinates } from "./config"
import { peers_dict } from "./peers"

export function is_valid(
	row: number,
	col: number,
	digit: number,
	board: board
): boolean {
	if (digit === 0) return true
	const peers = peers_dict[[row, col].toString()]
	return peers.every((key) => {
		const [x, y] = key.split(",")
		return board[parseInt(x)][parseInt(y)] != digit
	})
}

export function is_solved(board: board): boolean {
	return coordinates.every(
		([row, col]) =>
			board[row][col] >= 1 &&
			is_valid(row, col, board[row][col], board)
	)
}

export function parse_line(line: string): board | null {
	if (!line.match(LINE_REGEXP)) return null
	const board: board = []
	for (let row = 0; row < 9; row++) {
		board.push([])
		for (let col = 0; col < 9; col++) {
			const val = line[9 * row + col]
			board[row][col] = parseInt(val)
		}
	}
	return board
}

export function display_value(digit: number): string {
	return digit == 0 ? "" : digit.toString()
}

function random_int(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random())
}

export function random_element<T>(list: T[]): T {
	return list[random_int(0, list.length)]
}

export function generate_empty_pencil_board(): pencil_board {
	const board: pencil_board = []
	for (let row = 0; row < 9; row++) {
		board.push([])
		for (let col = 0; col < 9; col++) {
			board[row][col] = new Set()
		}
	}
	return board
}

export function marks_to_str(marks: marks): string {
	return [...marks].join("")
}

export function str_to_marks(str: string): marks {
	return new Set(str.split("").map((e) => parseInt(e)))
}
