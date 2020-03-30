import { writable } from 'svelte/store'

function createCounter () {
  const { subscribe, update } = writable({ countDown: null, countUp: null })

  const setCounter = (value, type) => {
    update(currentValue => {
      if (currentValue[type]) {
        currentValue[type] = value
      }
    })
  }

  return {
    subscribe,
    setCountDown: (value) => setCounter(value, 'countdown'),
    setCountUp: (value) => setCounter(value, 'countup'),
  }
}

export const counter = createCounter()
