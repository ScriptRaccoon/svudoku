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

export function display_value(value: number): string {
	return value == 0 ? "" : value.toString()
}
