import { LINE_REGEXP } from "./config"

export function is_valid(
	row: number,
	col: number,
	num: number,
	board: board
): boolean {
	if (num === 0) {
		return true
	}
	for (let i = 0; i < 9; i++) {
		if (i != row && board[i][col] === num) {
			return false
		}
		if (i != col && board[row][i] === num) {
			return false
		}
	}

	const row_start = 3 * Math.floor(row / 3)
	const col_start = 3 * Math.floor(col / 3)
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (
				(row_start + i != row || col_start + j != col) &&
				board[row_start + i][col_start + j] === num
			) {
				return false
			}
		}
	}

	return true
}

export function parse_line(line: string): number[][] | null {
	if (!line.match(LINE_REGEXP)) return null
	const board: number[][] = []
	for (let row = 0; row < 9; row++) {
		board.push([])
		for (let col = 0; col < 9; col++) {
			const val = line[9 * row + col]
			board[row][col] = val === "." ? 0 : parseInt(val)
		}
	}
	return board
}

export function display_value(value: number): string {
	return value == 0 ? "" : value.toString()
}

export function random_int(a: number, b: number) {
	return a + Math.floor((b - a) * Math.random())
}

export function random_element<T>(list: T[]): T {
	return list[random_int(0, list.length)]
}
