import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'

export function tooltip (elem, {
  enabled = true,
  content,
  componentProps,
  asPopover = false,
  popoverTooltip,
  title = '',
  ...opts
}) {
  if (!enabled) { return }

  let component, componentObject

  // defaults
  opts = {
    placement: asPopover ? 'bottom' : 'auto',
    allowHTML: asPopover,
    trigger: asPopover ? 'click' : 'mouseenter focus',
    theme: asPopover ? 'light-border' : '',
    animation: 'fade',
    interactive: asPopover,
    role: asPopover ? 'popover' : 'tooltip',
    delay: 100,
    ...opts,
  }

  // in case we want also a tooltip when having a popover
  if (asPopover && popoverTooltip) {
    tooltip(elem, popoverTooltip)
  }

  // if we are dealing with a Svelte component, parse the content with an empty body
  // then onCreate we are binding the new Svelte component to the tippy/popover selector with the component props
  if (typeof content === 'function') {
    componentObject = content
    content = ''

    opts.onCreate = instance => {
      const selector = asPopover ? '.popover-content' : '.tippy-content'
      // eslint-disable-next-line new-cap
      component = new componentObject({
        target: instance.popper.querySelector(selector),
        props: componentProps,
      })
    }
  }

  opts.content = formatContent(content, asPopover, title)

  const tippyInstance = tippy(elem, opts)

  return {
    update ({ componentProps, content, asPopover, title }) {
      if (component) {
        component.$set(componentProps)
      } else {
        const updatedContent = formatContent(content, asPopover, title)
        tippyInstance.setContent(updatedContent)
      }
    },
    destroy () {
      tippyInstance.destroy()
      if (component) {
        component.$destroy()
      }
    },
  }
}

function formatContent (content, asPopover, title) {
  const popoverTitle = asPopover && title ? `<div class="popover-title">${title}</div>` : ''
  return asPopover ? `${popoverTitle}<div class="popover-content">${content}</div>` : content
}
