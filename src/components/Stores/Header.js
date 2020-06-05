import { writable } from 'svelte/store'

function createHeader () {
  const { subscribe, update } = writable({
    countDown: false,
    countUp: false,
    timerTitle: '',
    deployUrl: '',
    dockerImage: '',
    showPlaceholderDeployButton: false, // TODO remove when deployment is possible
    failed: false,
    failedStatus: '',
    countDownFinish: false,
    countDownFixed: null, // in seconds
    applicationUrl: '',
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
    setDockerImage: (dockerImage) => setHeaderValues({ dockerImage }),
    showPlaceholderDeploymentButton: (showPlaceholderDeployButton = true) => setHeaderValues({ showPlaceholderDeployButton }),
    setApplicationUrl: (applicationUrl) => setHeaderValues({ applicationUrl }),
  }
}

export const header = createHeader()
