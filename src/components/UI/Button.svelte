<script>
  import { tooltip } from '../Actions'

  export let type = 'button'
  export let href = null
  export let target = null
  export let mode = null
  export let disabled = false
  export let flex = false
  export let big = false
  export let isActive = false
  export let small = false
  export let tooltipOptions = {}

  // set the marker if we have a tooltip
  tooltipOptions.enabled = !!tooltipOptions.content

  let restProps

  $: classes = `${mode || ''} ` + ($$props.class || '')
  $: {
    restProps = $$restProps
    delete restProps.class
  }
</script>

<style lang="sass">
  @import "./assets/style/theme"

  button,
  a
    border: .1rem solid $button-background
    background: $button-background
    padding: .5rem 1rem
    color: $white
    border-radius: $button-radius
    box-shadow: .2rem .2rem .5rem rgba(0, 0, 0, .4)
    font-size: $default-font-size
    transition: .1s all
    cursor: pointer
    text-decoration: none
    display: inline-block

    &:hover,
    &:active,
    &.active
      box-shadow: .2rem .2rem .1rem rgba(0, 0, 0, .4)

    &.small
      font-size: 1.4rem

    &.big
      font-size: 1.8rem

  button
    &.big
      padding: .5rem 1.5rem

    &.flex
      display: flex
      align-items: center

    &:focus
      outline: none

    &:disabled,
    &:disabled:hover,
    &:disabled:active
      background: $gray-light
      border-color: $gray-light
      color: #959595
      box-shadow: none
      cursor: not-allowed

  .outline
    background: transparent
    color: $button-background
    box-shadow: none

    &:hover,
    &:active,
    &.active
      background: darken($primary-color, 3%)
      box-shadow: none

    &:disabled,
    &:disabled:hover,
    &:disabled:active
      background: transparent
      color: $gray-light

  .default
    background: transparent
    color: $button-background
    box-shadow: none !important
    border: none !important
    padding: 0
</style>

{#if href}
  <a
    {...restProps}
    {href}
    {target}
    class:big
    class:small
    class:active={isActive}
    class={classes}
    use:tooltip={tooltipOptions}
  >
    <slot/>
  </a>
{:else}
  <button
    {...restProps}
    class:flex
    class:big
    class:small
    class:active={isActive}
    class={classes}
    {type}
    {disabled}
    on:click
    use:tooltip={tooltipOptions}
  >
    <slot/>
  </button>
{/if}
