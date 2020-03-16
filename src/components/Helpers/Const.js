import { goto } from '@sapper/app'

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const displayTimer = (totalSeconds) => {
  const hour = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hour * 3600) / 60)
  const seconds = totalSeconds - ((hour * 3600) + (minutes * 60));

  return zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2)
}

export const redirectWithError = (errorMsg, path = '/') => {
  const error = encodeURI(errorMsg)
  goto(`${path}?error=${error}`)
}

export const getCurrentUrl = () => {
  return process.browser ? `${location.protocol}//${location.host}` : ''
}
