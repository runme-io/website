import { writable } from 'svelte/store'

function createHeader () {
  const { subscribe, update } = writable({
    countDown: false,
    countUp: false,
    timerTitle: '',
    deployUrl: '',
    dockerPullCommand: '',
    failed: false,
    failedStatus: '',
    countDownFinish: false,
    countDownFixed: null, // in seconds
  })

  const setHeaderValues = (newValue) => update(currentValue => ({ ...currentValue, ...newValue }))

  return {
    subscribe,
    showCountDown: (countDown, timerTitle = 'Countdown', countDownFixed = null) => setHeaderValues({
      countDown,
      countUp: false,
      timerTitle,
      countDownFixed,
    }),
    showCountUp: (countUp, timerTitle = 'Progress time') => setHeaderValues({ countUp, countDown: false, timerTitle }),
    setTimerTitle: (timerTitle) => setHeaderValues({ timerTitle }),
    setDeploymentUrl: (deployUrl) => setHeaderValues({ deployUrl }),
    isFailed: (failed = true, failedStatus = 'Failed') => setHeaderValues({ failed, failedStatus }),
    setCountDownFinish: (countDownFinish = true) => setHeaderValues({ countDownFinish }),
    setDockerPullCommand: (dockerPullCommand) => setHeaderValues({ dockerPullCommand }),
  }
}

export const header = createHeader()
