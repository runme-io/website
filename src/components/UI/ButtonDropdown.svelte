<script>
  import Icon from 'fa-svelte'
  import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
  import Button from './Button.svelte'

  export let mode = 'default'
  export let label = ''

  let showOptions = false
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .dropdown-button
    position: relative

    \:global(.button-dropdown.active)
      box-shadow: inset -.1rem .1rem .4rem rgba(0, 0, 0, .15)

  .dropdown-options
    position: absolute
    margin-top: .5rem
    border: .1rem solid lighten($button-background, 30%)
    border-radius: $button-radius
    background: $white
    box-shadow: .1rem .1rem .5rem rgba(0, 0, 0, .2)

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
      isActive={showOptions}
      on:click={() => (showOptions = !showOptions)}
  >
    {label}
    <div class="icon">
      <Icon class="button-drop-down-icon" icon={faCaretDown}/>
    </div>
  </Button>

  {#if showOptions}
    <div class="dropdown-options">
      <slot/>
    </div>
  {/if}
</div>
