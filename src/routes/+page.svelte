<script lang="ts">
	import { onDestroy, onMount, tick } from "svelte"
	import { browser } from "$app/environment"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"

	import Board from "$lib/components/Board.svelte"
	import Errors from "$lib/components/Errors.svelte"
	import Menu from "$lib/components/Menu.svelte"
	import TopMenu from "$lib/components/TopMenu.svelte"
	import Popup from "$lib/components/Popup.svelte"
	import Settings from "$lib/components/Settings.svelte"

	import {
		ACTION_TYPE,
		DELETE_KEYS,
		DIGITS,
		CANDIDATE_LIMIT,
		CANDIDATE_KEYS,
		coordinates
	} from "$lib/config"

	import {
		edit_candidates,
		selected_coord,
		error_message,
		popup,
		show_conflicts,
		show_settings
	} from "$lib/stores"

	import { is_solved, is_valid, convert_to_line } from "$lib/utils"

	import { peers_dict } from "$lib/peers"

	let original: Record<string, number> = $page.data.original
	$: creating = $page.data.creating

	let board: Record<string, number> = Object.assign({}, original)

	if (browser && window.localStorage.getItem("board")) {
		board = JSON.parse(window.localStorage.getItem("board")!)
	}

	let candidate_board: Record<string, string> = Object.fromEntries(
		coordinates.map((coord) => [coord, ""])
	)

	if (browser && window.localStorage.getItem("candidate_board")) {
		candidate_board = JSON.parse(
			window.localStorage.getItem("candidate_board")!
		)
	}

	let validity_board: Record<string, boolean> = Object.fromEntries(
		coordinates.map((coord) => [coord, true])
	)

	let can_undo = false
	let actions: string[] = []

	if (browser && window.localStorage.getItem("actions")) {
		actions = JSON.parse(window.localStorage.getItem("actions")!)
		if (actions.length > 0) can_undo = true
	}

	let app: HTMLElement

	$: can_place_digit = $selected_coord
		? original[$selected_coord] === 0 &&
		  (!$edit_candidates || board[$selected_coord] === 0)
		: false

	$: if ($page.data.original != original) {
		original = $page.data.original
		reset()
	}

	$: if (browser) {
		window.localStorage.setItem("board", JSON.stringify(board))
	}

	$: if (browser) {
		window.localStorage.setItem(
			"candidate_board",
			JSON.stringify(candidate_board)
		)
	}

	$: if (browser) {
		window.localStorage.setItem("actions", JSON.stringify(actions))
	}

	function reset(confirm = false) {
		if (confirm) {
			$popup = {
				text: "Do you really want to reset the game?",
				action: reset
			}
			return
		}

		for (const coord of coordinates) {
			board[coord] = original[coord]
			candidate_board[coord] = ""
		}

		$selected_coord = null
		$error_message = ""
		actions = []
		can_undo = false
	}

	function load_new_board() {
		$popup = {
			text: "Do you really want to start a new game?",
			action: () => {
				reset()
				goto("/")
			}
		}
	}

	function set_digit(digit: number): void {
		if (!$selected_coord || !DIGITS.includes(digit)) return
		if (original[$selected_coord] >= 1) return
		const coord = $selected_coord

		$error_message = ""
		const digit_str = String(digit)

		if ($edit_candidates) {
			if (board[coord] >= 1) return
			const prev = candidate_board[coord]
			if (digit === 0) {
				candidate_board[coord] = ""
			} else if (prev.includes(digit_str)) {
				candidate_board[coord] = candidate_board[coord].replace(digit_str, "")
			} else if (prev.length < CANDIDATE_LIMIT) {
				candidate_board[coord] += digit_str
			} else {
				return
			}
			const next = candidate_board[coord]
			const action = `${ACTION_TYPE.CANDIDATE}:${coord}:${prev}:${next}`
			actions.push(action)
		} else {
			const action = `${ACTION_TYPE.BOARD}:${coord}:${board[coord]}:${digit}`
			actions.push(action)
			board[coord] = digit
			for (const peer of peers_dict[coord]) {
				const prev = candidate_board[peer]
				if (!prev.includes(digit_str)) continue
				candidate_board[peer] = candidate_board[peer].replace(digit_str, "")
				const next = candidate_board[peer]
				const minor_action = `${ACTION_TYPE.CANDIDATE}:${peer}:${prev}:${next}`
				actions.push(minor_action)
			}
		}

		actions = actions
		can_undo = true

		if (is_solved(board)) {
			$popup = { text: "Solved!", action: null }
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
			candidate_board[coord] = prev
		}
		if (actions.length === 0) can_undo = false
		actions = actions
	}

	function toggle_candidates() {
		$edit_candidates = !$edit_candidates
	}

	function handle_click(e: MouseEvent) {
		if (!app?.contains(e.target as HTMLElement)) $selected_coord = null
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

	function create_empty_board() {
		goto("/?mode=create")
		$show_settings = false
	}

	function get_url() {
		const line = convert_to_line(board)
		return `${$page.url.origin}/?q=${line}`
	}

	async function copy_url() {
		const url = get_url()
		try {
			await window.navigator.clipboard.writeText(url)
			$popup = {
				text: "URL has been copied to the clipboard",
				action: null
			}
		} catch {
			$popup = {
				text: "URL could not be copied",
				action: null
			}
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

{#if $show_settings}
	<Settings on:create={create_empty_board} />
{:else}
	<div bind:this={app}>
		<TopMenu
			{creating}
			on:show_settings={() => ($show_settings = true)}
			on:copy={copy_url}
		/>
		<Board bind:board bind:candidate_board {validity_board} />
		<Popup />

		<Menu
			on:reset={() => reset(true)}
			on:new={load_new_board}
			on:digit={(e) => set_digit(e.detail)}
			on:undo={undo}
			on:toggle_candidates={toggle_candidates}
			{can_place_digit}
			{can_undo}
		/>
		<Errors />
	</div>
{/if}
