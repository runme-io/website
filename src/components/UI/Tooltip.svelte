<script>
  import tippy from 'tippy.js'
  import 'tippy.js/dist/tippy.css'
  import 'tippy.js/themes/light-border.css'

  export let content = ''
  export let asPopover = false
  export let popoverTitle = ''

  const popoverTitleHtml = popoverTitle ? `<div class="popover-title">${popoverTitle}</div>` : ''
  let tippyInstance = null

  $: content = asPopover ? `${popoverTitleHtml}<div class="popover-content">${content}</div>` : content
  $: {
    if (tippyInstance) {
      tippyInstance.setContent(content)
    }
  }

  const props = {
    content,
    placement: asPopover ? 'bottom' : 'auto',
    allowHTML: asPopover,
    trigger: asPopover ? 'click' : 'mouseenter focus',
    theme: asPopover ? 'light-border' : '',
    animation: 'fade',
    interactive: asPopover,
    role: asPopover ? 'popover' : 'tooltip',
    ...$$restProps,
  }

  function tooltip (node, props) {
    tippyInstance = tippy(node, props)
  }
</script>

<style lang="sass">
  $backroundColor: #eee

  \:global(.tippy-box)
    user-select: text
    cursor: default
    font-size: 1.1rem

  \:global(.tippy-box[role='popover']),
  \:global(.tippy-box[role='popover'] .tippy-content)
    padding: 0

  \:global(.tippy-box[role='popover'][data-placement^=bottom] > .tippy-arrow:before)
    border-bottom-color: $backroundColor

  \:global(.tippy-box .popover-title)
    border-bottom: .1rem solid #e2e2e2
    padding: .7rem 1rem
    font-size: 1.2rem
    background: $backroundColor

  \:global(.tippy-box .popover-content)
    padding: 1rem
</style>

<span class:tooltip={!asPopover} class:popover={asPopover} use:tooltip={props}>
  <slot/>
</span>
