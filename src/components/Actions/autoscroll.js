export function autoscroll (nodeElement, {
  onInit = true,
  delay = 200,
} = {}) {
  if (!onInit) { return }

  setTimeout(
    () => nodeElement.scrollIntoView({ behavior: 'smooth' }),
    delay,
  )
}
