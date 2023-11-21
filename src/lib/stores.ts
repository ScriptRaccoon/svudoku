import { writable } from "svelte/store"

export const pencil_active = writable(false)
export const selected_coord = writable<null | coord>(null)
