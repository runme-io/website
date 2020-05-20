<script>
  import Icon from 'fa-svelte'
  import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
  import { tooltip } from '../Actions'
  import Button from './Button.svelte'

  export let asButton = false
  export let target = null
  export let href = null
  export let tooltipOptions = {}

  // set the marker if we have a tooltip
  tooltipOptions.enabled = !!tooltipOptions.content
</script>

<style lang="sass">
  @import "./assets/style/theme"

  a[target="_blank"]
    position: relative
    margin-right: 1rem

    \:global(.external-icon)
      position: absolute
      right: -1.2rem
      width: 1rem
</style>

{#if asButton}
  <Button
    {...$$restProps}
    {href}
    {target}
    {tooltipOptions}
  >
    <slot />
  </Button>
{:else}
  <a
    {...$$restProps}
    {href}
    {target}
    use:tooltip={tooltipOptions}
  >
    <slot/>{#if target}<Icon class="external-icon" icon={faExternalLinkAlt}/>{/if}
  </a>
{/if}
