export function to_coord(row: number, col: number) {
	return String(row) + String(col)
}

export const coordinates: string[] = Array.from({ length: 9 }, (_, row) =>
	Array.from({ length: 9 }, (_, col) => to_coord(row, col))
).flat()

export const initial_valid_board: Record<string, boolean> = Object.fromEntries(
	coordinates.map((coord) => [coord, true])
)

export const LINE_REGEXP = /^[0-9]{81}$/

export const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const DELETE_KEYS = ["Backspace", "x"]
export const PENCIL_KEYS = ["p", " "]

export const ACTION_TYPE = {
	BOARD: "b",
	PENCIL: "p"
}

export const MARK_LIMIT = 6

export const MODES = ["easy", "hard"]
export const MODE_DEFAULT = MODES[0]
