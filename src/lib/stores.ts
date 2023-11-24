import { writable } from "svelte/store"

export const pencil_active = writable(false)
export const selected_coord = writable<null | string>(null)
export const error_message = writable("")
