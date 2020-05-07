export function isGitUrl(str) {
  const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
  return regex.test(str)
}

export function isDockerUrl(str) {
  // TODO: improve regex
  const regex = /(\w+):(\w+)/i
  return regex.test(str)
}

export function isEmpty (val) {
  if ([null, undefined].includes(val)) {
    return true
  }

  if (Array.isArray(val)) {
    return Boolean(val.length)
  }

  if (typeof val === 'object') {
    return Boolean(Object.values(val).length)
  }

  return String(val).trim().length === 0
}
