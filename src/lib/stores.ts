import { writable } from "svelte/store"

export const pencil_active = writable(false)
export const selected_coord = writable<null | string>(null)
export const error_message = writable("")

export const popup_text = writable<null | string>("")
export const popup_action = writable<null | (() => void)>(null)
