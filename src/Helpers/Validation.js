export function isGitUrl(str) {
  const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
  return regex.test(str)
}

export function isDockerUrl(str) {
  const regex = /^[a-z0-9\/._-]+:[a-z0-9._-]+$/i
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

export function notEmpty(val) {
    return !isEmpty(val)
}
