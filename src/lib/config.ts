export const coordinates: [number, number][] = new Array(9 ** 2)
	.fill(0)
	.map((_, i) => [Math.floor(i / 9), i % 9])

export const LINE_REGEXP = /^[1-9.]{81}$/

export const DIGITS = "123456789"
