import { to_coord } from "./config"

export const peers_dict: Record<string, string[]> = {}

for (let row = 0; row < 9; row++) {
	for (let col = 0; col < 9; col++) {
		const key = to_coord(row, col)
		peers_dict[key] = []
		for (let i = 0; i < 9; i++) {
			if (i !== row) peers_dict[key].push(to_coord(i, col))
			if (i !== col) peers_dict[key].push(to_coord(row, i))
		}
		const row_start = 3 * Math.floor(row / 3)
		const col_start = 3 * Math.floor(col / 3)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (row_start + i != row && col_start + j != col)
					peers_dict[key].push(to_coord(row_start + i, col_start + j))
			}
		}
	}
}
