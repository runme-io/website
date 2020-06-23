import { removeDoubleSlashes } from './Const'
import { RUNME_API } from '../env'

function setApiUrl (path, protocol = 'http') {
  const secure = RUNME_API.secure ? 's' : ''
  const url = `${protocol}${secure}://${RUNME_API.host}/${path}`

  return removeDoubleSlashes(url)
}

export function wsBuild (buildId, callback) {
  const url = setApiUrl('ws', 'ws')
  const ws = new WebSocket(url)

  ws.onopen = function () {
    ws.send(JSON.stringify({ command: 'subscribe', payload: { build_id: buildId } }))
  }

  ws.onmessage = function (message) {
    if (typeof callback === 'function') {
      callback(JSON.parse(message.data).payload)
    }
  }

  return ws
}

export async function runApiRequest (url, method = 'GET', body = null) {
  body = body ? JSON.stringify(body) : null
  url = setApiUrl(url)

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
      throw new Error(result.message)

    case 409:
      // eslint-disable-next-line no-case-declarations
      const error = new Error(result.message)
      error.lastBuild = result.last_build_at
      error.nextBuild = result.next_build_since
      throw error

    default:
      throw new Error('unknown error occur')
  }
}
