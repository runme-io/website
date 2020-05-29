<script>
  import { fade } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import { DEFAULT_TRANSTION } from '../../Consts'
  import Button from './Button.svelte'

  export let click = null
  export let href = null
  export let target = null
  export let icon = null
  export let label = ''
  export let description = ''
  export let notification = ''
  export let notificationDelay = 3000
  export let disabled = false

  let notificationTimeout = null

  $: {
    if (notification) {
      clearTimeout(notificationTimeout)
      notificationTimeout = setTimeout(() => (notification = ''), notificationDelay)
    }
  }
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .dropdown-option
    border-bottom: .1rem solid lighten($button-background, 50%)
    text-align: left
    display: block
    text-decoration: none
    width: 100%

    &.disabled
      cursor: not-allowed

      \:global(.dropdown-option-button)
        pointer-events: none
        background: lighten($gray, 50%)
        color: $gray !important

    &:hover
      background: $primary-color

    &:last-child
      border: 0

    .label
      display: flex
      align-items: center

      strong
        display: inline-block
        padding-left: 1rem
        font-size: 1.4rem

      .notification
        margin-left: auto
        font-size: 1.2rem
        color: $success
        pointer-events: none

    span
      font-size: 1.2rem

  \:global(.dropdown-option-button)
    padding: 1rem 1.5rem !important
    width: 100%
    text-align: left
</style>

<div class="dropdown-option" class:disabled>
  <Button
    on:click={click}
    {href}
    {target}
    class="dropdown-option-button"
    mode="default"
  >
    <div class="label">
      <Icon icon={icon}/>
      <strong>{label}</strong>
      {#if notification}
        <span transition:fade="{DEFAULT_TRANSTION}" class="notification">{notification}</span>
      {/if}
    </div>
    <span>{description}</span>
  </Button>
</div>
