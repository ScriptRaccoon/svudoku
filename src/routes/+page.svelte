<script lang="ts">
	import { browser } from "$app/environment"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import Board from "$lib/components/Board.svelte"
	import Errors from "$lib/components/Errors.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import TopMenu from "$lib/components/TopMenu.svelte"
	import Popup from "$lib/components/Popup.svelte"
	import {
		ACTION_TYPE,
		DELETE_KEYS,
		DIGITS,
		CANDIDATE_LIMIT,
		DIFFICULTY_DEFAULT,
		CANDIDATE_KEYS,
		coordinates
	} from "$lib/config"
	import {
		edit_candidates,
		selected_coord,
		error_message,
		popup_text,
		popup_action,
		show_conflicts
	} from "$lib/stores"
	import {
		is_solved,
		is_valid,
		candidates_to_str,
		str_to_candidates
	} from "$lib/utils"
	import { onDestroy, onMount, tick } from "svelte"

	let original: Record<string, number> = $page.data.original
	let board: Record<string, number> = Object.assign({}, original)
	let candidate_board: Record<string, Set<number>> = Object.fromEntries(
		coordinates.map((coord) => [coord, new Set()])
	)
	let validity_board: Record<string, boolean> = Object.fromEntries(
		coordinates.map((coord) => [coord, true])
	)

	let actions: string[] = []
	let can_undo = false
	let app: HTMLElement
	let difficulty = DIFFICULTY_DEFAULT

	$: can_place_digit = $selected_coord
		? original[$selected_coord] === 0 &&
		  (!$edit_candidates || board[$selected_coord] === 0)
		: false

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}

	function reset(confirm = false) {
		if (confirm) {
			$popup_text = "Do you really want to reset the game?"
			$popup_action = reset
			return
		}

		for (const coord of coordinates) {
			board[coord] = original[coord]
			candidate_board[coord] = new Set()
		}

		$selected_coord = null
		$error_message = ""
		actions = []
		can_undo = false
	}

	function load_new_board() {
		$popup_text = "Do you really want to start a new game?"
		$popup_action = () => {
			reset()
			goto(`/?d=${difficulty}`)
		}
	}

	function set_digit(digit: number): void {
		if (!$selected_coord || !DIGITS.includes(digit)) return
		if (original[$selected_coord] >= 1) return
		const coord = $selected_coord

		$error_message = ""
		let action = ""

		if ($edit_candidates) {
			if (board[coord] >= 1) return
			const candidates = candidate_board[coord]
			const prev = candidates_to_str(candidates)

			if (digit === 0) {
				candidates.clear()
			} else if (candidates.has(digit)) {
				candidates.delete(digit)
			} else if (candidates.size < CANDIDATE_LIMIT) {
				candidates.add(digit)
			} else {
				return
			}
			const next = candidates_to_str(candidates)
			action = `${ACTION_TYPE.CANDIDATE}:${coord}:${prev}:${next}`
			candidate_board[coord] = candidates
		} else {
			action = `${ACTION_TYPE.BOARD}:${coord}:${board[coord]}:${digit}`
			board[coord] = digit
		}

		actions.push(action)
		can_undo = true

		if (is_solved(board)) {
			$popup_text = "Solved!"
			$popup_action = null
		}
	}

	function handle_keydown(e: KeyboardEvent): void {
		const { key } = e
		if (CANDIDATE_KEYS.includes(key)) {
			$edit_candidates = !$edit_candidates
			return
		}
		const digit = DELETE_KEYS.includes(key) ? 0 : Number(key)
		set_digit(digit)
	}

	function undo() {
		$error_message = ""
		const action = actions.pop()
		if (!action) return
		const [type, coord, prev] = action.split(":")
		if (type === ACTION_TYPE.BOARD) {
			board[coord] = Number(prev)
		} else if (type === ACTION_TYPE.CANDIDATE) {
			candidate_board[coord] = str_to_candidates(prev)
		}
		if (actions.length === 0) can_undo = false
	}

	function toggle_candidates() {
		$edit_candidates = !$edit_candidates
	}

	function handle_click(e: MouseEvent) {
		if (!app?.contains(e.target as HTMLElement)) $selected_coord = null
	}

	async function change_difficulty() {
		await tick()
		load_new_board()
	}

	$: if (board) {
		update_validity_board()
	}

	function update_validity_board() {
		const invalid_digits = new Set()
		for (const coord of coordinates) {
			const digit = board[coord]
			const valid = is_valid(coord, digit, board)
			validity_board[coord] = valid
			if (!valid) {
				invalid_digits.add(digit)
			}
		}
		if (invalid_digits.size && $show_conflicts) {
			$error_message =
				"Oups! There is a conflict with the digit(s) " +
				String(Array.from(invalid_digits).sort())
		}
	}

	onMount(() => {
		if (browser) document.addEventListener("click", handle_click)
	})

	onDestroy(() => {
		if (browser) document.removeEventListener("click", handle_click)
	})
</script>

<svelte:window on:keydown={handle_keydown} />

<div bind:this={app}>
	<TopMenu on:change={change_difficulty} bind:difficulty />
	<Board bind:board {original} bind:candidate_board {validity_board} />
	<Popup />
	<Errors />

	<Menu
		on:reset={() => reset(true)}
		on:new={load_new_board}
		on:digit={(e) => set_digit(e.detail)}
		on:undo={undo}
		on:toggle_candidates={toggle_candidates}
		{can_place_digit}
		{can_undo}
	/>
</div>
