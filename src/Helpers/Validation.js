export function isGitUrl(str) {
  const regex = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\.git)(\/?|\#[-\d\w._]+?)$/
  return regex.test(str)
}

export function isDockerUrl(str) {
  const regex = /(\w+):(\w+)/i
  return regex.test(str)
}

export function isEmpty (val) {
  return [null, undefined].includes(val) || val.trim().length === 0
}

export function isValidEmail (val) {
  return new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  ).test(val)
}
