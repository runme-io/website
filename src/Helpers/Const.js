export const zeroPad = (num, places) => String(num).padStart(places, '0')

export const removeDoubleSlashes = (path) => path.replace(/([^:])(\/\/+)/g, '$1/')

export const displayTimer = (totalSeconds) => {
  const hour = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - hour * 3600) / 60)
  const seconds = totalSeconds - ((hour * 3600) + (minutes * 60))

  return zeroPad(minutes, 2) + ':' + zeroPad(seconds, 2)
}

export const isBase64 = (str) => {
  if (str === '' || str.trim() === '') {
    return false
  }

  try {
    return btoa(atob(str)) === str
  } catch (err) {
    return false
  }
}

export const setUrl = (path) => {
  const url = `${location.protocol}//${location.host}/${path}`
  return removeDoubleSlashes(url)
}

// parse a git url to the following format "https://<repo URL>.git"
export const parseGitUrl = async (url) => {
  try {
    const { default: GitUrlParse } = await import('git-url-parse')
    const { source, owner, name } = GitUrlParse(url)

    if (!source || !owner || owner.match(/\//) || !name) { return '' }

    return `https://${source}/${owner}/${name}.git`
  } catch (e) { return '' }
}
