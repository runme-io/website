export async function copyToClipboard (content) {
  try {
    await navigator.clipboard.writeText(content)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
