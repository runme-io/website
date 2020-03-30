import { writable } from 'svelte/store'

function createHeader () {
  const { subscribe, update } = writable({ countDown: false, countUp: false, timerTitle: '', failed: false, failedStatus: '' })

  const setHeaderValues = (newValue) => update(currentValue => ({ ...currentValue, ...newValue }))

  return {
    subscribe,
    showCountDown: (countDown) => setHeaderValues({ countDown, countUp: false }),
    showCountUp: (countUp) => setHeaderValues({ countUp, countDown: false }),
    setTimerTitle: (timerTitle) => setHeaderValues({ timerTitle }),
    setFailed: (failed = true, failedStatus = 'Failed') => setHeaderValues({ failed, failedStatus }),
  }
}

export const header = createHeader()
