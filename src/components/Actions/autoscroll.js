export function autoscroll (nodeElement, {
  enabled = true,
  delay = 200,
  scrollIntoViewOptions = { behavior: 'smooth' },
} = {}) {
  if (!enabled) { return }

  setTimeout(
    () => nodeElement.scrollIntoView(scrollIntoViewOptions),
    delay,
  )
}
