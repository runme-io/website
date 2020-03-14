export async function runmeCreate(repo_url, repo_branch = 'master', docker_image = '') {
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

export async function runmeStart(app_id) {
  const response = await fetch(`https://svc.runme.io/v1/apps/${app_id}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  return await response.json()
}

export async  function runmeBuild(build_id) {
  const response = await fetch(`https://svc.runme.io/v1/build/${build_id}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })

  return await response.json()
}
