import { writable } from "svelte/store"

export const edit_candidates = writable(false)
export const selected_coord = writable<null | string>(null)
export const error_message = writable("")

export const popup_text = writable<null | string>("")
export const popup_action = writable<null | (() => void)>(null)

export const show_highlights = writable<boolean>(true)
export const show_conflicts = writable<boolean>(true)
export const show_settings = writable<boolean>(false)
