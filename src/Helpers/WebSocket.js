import { setApiUrl } from './Const'

export function wsBuild (buildId, callback) {
  if (process.browser) {
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
  }
}
