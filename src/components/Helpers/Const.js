import { goto } from '@sapper/app'
import axios from 'axios'
import { RUNME_API } from '../../env'

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const removeDoubleSlashes = (path) => path.replace(/([^:])(\/\/+)/g, '$1/')

export const displayTimer = (totalSeconds) => {
  const hour = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hour * 3600) / 60)
  const seconds = totalSeconds - ((hour * 3600) + (minutes * 60));

  return zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2)
}

export const redirectWithError = (errorMsg, path = '/') => {
  if (process.browser) {
    const error = encodeURI(errorMsg)
    goto(`${path}?error=${error}`)
  }
}

export const isBase64 = (str) => {
  if (str === '' || str.trim() === ''){
    return false
  }

  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

export const setUrl = (path) => {
  if (process.browser) {
    const url = `${location.protocol}//${location.host}/${path}`

    // remove double slashes
    return removeDoubleSlashes(url)
  }
}

export const setApiUrl = (path, protocol = 'http') => {
  const secure = RUNME_API.secure ? 's' : ''
  const url = `${protocol}${secure}://${RUNME_API.host}/${path}`

  // remove double slashes
  return removeDoubleSlashes(url)
}

export const runApiRequest = (url, method = 'GET', data = null) => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

  return instance({
    method,
    url: setApiUrl(url),
    data
  });
}
