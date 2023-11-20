export const BOARD_COUNT = 95

export const coordinates: [number, number][] = new Array(9 ** 2)
	.fill(0)
	.map((_, i) => [Math.floor(i / 9), i % 9])
