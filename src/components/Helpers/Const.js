import { goto } from '@sapper/app'
import { RUNME_API } from '../../env'

export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const removeDoubleSlashes = (path) => path.replace(/([^:])(\/\/+)/g, '$1/')

export const displayTimer = (totalSeconds) => {
  const hour = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hour * 3600) / 60)
  const seconds = totalSeconds - ((hour * 3600) + (minutes * 60))

  return zeroPad(minutes, 2) + ':' + zeroPad(seconds, 2)
}

export const redirectWithError = (errorMsg, path = '/') => {
  if (process.browser) {
    const error = encodeURI(errorMsg)
    goto(`${path}?error=${error}`)
  }
}

export const isBase64 = (str) => {
  if (str === '' || str.trim() === '') {
    return false
  }

  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
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

export const runApiRequest = async (url, method = 'GET', body = null) => {
  if (process.browser) {
    body = body ? JSON.stringify(body) : null
    url = setApiUrl(url)

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body,
    })

    const result = await response.json()

    // handle errors
    switch (response.status) {
      case 200:
        return result

      case 404:
      case 400:
      case 500:
        throw {
          message: result.message
        }

      case 409:
        throw {
          message: result.message,
          lastBuild: result.last_build_at,
          nextBuild: result.next_build_since,
        }

      default:
        throw {
          message: 'unknown error occur',
        }
    }
  }
}
