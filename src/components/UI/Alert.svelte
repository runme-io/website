<script>
  import { fade } from 'svelte/transition'
  import { autoscroll } from '../Actions'
  import { DEFAULT_TRANSTION } from '../../Consts'

  export let type = ''
  export let scrollOptions = { enabled: true }

  $: classType = `alert--${type}`
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .alert-container
    padding-top: 1rem

  .alert
    position: relative
    padding: 1rem 2rem !important
    margin-bottom: 3rem
    border: .1rem solid transparent
    border-radius: .5rem
    font-weight: bold
    font-size: 1.4rem

  .alert--success
    color: $success
    background-color: #d4edda
    border-color: #c3e6cb

  .alert--danger
    color: $danger
    background-color: #f8d7da
    border-color: #f5c6cb

  .alert--warning
    color: $warning
    background-color: #fff3cd
    border-color: #ffeeba

  .alert--info
    color: $info
    background-color: #d1ecf1
    border-color: #bee5eb
</style>

<div
  class="alert-container"
  use:autoscroll={scrollOptions}
>
  <div
    transition:fade={DEFAULT_TRANSTION}
    class="alert {classType}"
  >
    <slot />
  </div>
</div>
