import { writable } from 'svelte/store'

const { subscribe, set } = writable({})

export default {
    subscribe,
    set
}
