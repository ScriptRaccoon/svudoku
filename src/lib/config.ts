export const coordinates: coord[] = new Array(9 ** 2)
	.fill(0)
	.map((_, i) => [Math.floor(i / 9), i % 9])

export const LINE_REGEXP = /^[1-9.]{81}$/

export const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export const DELETE_KEYS = ["Backspace", "x"]

export const ACTION_TYPE = {
	BOARD: "b",
	PENCIL: "p",
}
