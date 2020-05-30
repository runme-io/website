<script>
  import { fade } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
  import Button from './Button.svelte'
  import { DEFAULT_TRANSTION } from '../../../Consts'

  export let mode = 'default'
  export let label = ''

  let isOpen = false
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .dropdown-button
    \:global(.button-dropdown.active)
      box-shadow: inset -.1rem .1rem .4rem rgba(0, 0, 0, .15)

  .backdrop
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: $overlay-zindex
    display: block
    cursor: default

  .dropdown-options
    position: absolute
    z-index: $overlay-zindex + 1
    margin-top: .5rem
    border: .1rem solid lighten($button-background, 30%)
    border-radius: $button-radius
    background: $white
    box-shadow: .1rem .1rem .5rem rgba(0, 0, 0, .2)

    @media screen and (max-width: 600px)
      left: 1rem
      right: 1rem

  .icon
    align-self: center
    display: flex

    &:before
      margin: 0 1rem
      content: ''
      background: $button-background
      width: .1rem
</style>

<div class="dropdown-button">
  <Button
    class="button-dropdown"
    {mode}
    flex={true}
    small={true}
    isActive={isOpen}
    on:click={() => (isOpen = !isOpen)}
  >
    {label}
    <div class="icon">
      <Icon class="button-drop-down-icon" icon={faCaretDown}/>
    </div>
  </Button>

  {#if isOpen}
    <div transition:fade={DEFAULT_TRANSTION} class="dropdown-options">
      <slot/>
    </div>
    <div class="backdrop" on:click={() => (isOpen = !isOpen)}></div>
  {/if}
</div>
