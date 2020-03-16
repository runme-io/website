export function runmeService() {
  async function create(repo_url, repo_branch = 'master', docker_image = '') {
    const response = await fetch(`https://svc.runme.io/v1/apps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        repo_url,
        repo_branch,
        docker_image
      }),
    })

    return await response.json()
  }

  async function start(app_id) {
    const response = await fetch(`https://svc.runme.io/v1/apps/${app_id}/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    return await response.json()
  }

  async function build(build_id) {
    const response = await fetch(`https://svc.runme.io/v1/builds/${build_id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })

    return await response.json()
  }

  function wsBuild(build_id, callback) {
    const ws = new WebSocket('wss://svc.runme.io/ws');

    ws.onopen = function(){
      ws.send(JSON.stringify({ "command": "subscribe", "payload": {"build_id": build_id} }))
    }

    ws.onmessage = function(message) {
      if (typeof callback === 'function') {
        callback(JSON.parse(message.data).payload)
      }
    }
  }

  return {
    create,
    start,
    build,
    wsBuild,
  }
}
