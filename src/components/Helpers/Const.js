import { goto } from '@sapper/app'

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
  const secure = process.env.RUNME_API_SSL ? 's' : ''
  const url = `${protocol}${secure}://${process.env.RUNME_API_HOST}/${path}`

  // remove double slashes
  return removeDoubleSlashes(url)
}

export const run = async (url, method = 'GET', body = null) => {
  const response = await fetch(setApiUrl(url), {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body ? JSON.stringify(body) : null,
  })

  return await response.json()
}
