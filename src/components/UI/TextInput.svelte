<script>
  import { createEventDispatcher } from 'svelte'

  export let controlType = null
  export let id = null
  export let label = null
  export let rows = null
  export let value = ''
  export let min = null
  export let type = 'text'
  export let valid = true
  export let validityMessage = ''
  export let placeholder = ''
  // whether this form control has compact style: less margin
  export let compact = false
  // whether this element should be focused when rendered
  export let focus = false

  const dispatch = createEventDispatcher()

  let touched = false

  function handleEnter (event) {
    if (event.which === 13) {
      touched = true
      dispatch('enter')
    }
  }

  function init (nodeElement) {
    if (focus) {
      nodeElement.focus()
    }
  }
</script>

<style lang="sass">
  @import './assets/style/theme'
  .compact
    margin-bottom: $label-margin
</style>

<div
  class="form-control"
  class:compact={compact}
>
  {#if label}<label for={id}>{label}</label>{/if}

  {#if controlType === 'textarea'}
    <textarea
      class:invalid="{!valid && touched}"
      {rows}
      {placeholder} {id}
      bind:value
      on:blur={() => {
        touched = true
      }}
    />
  {:else}
    <input
      class:invalid="{!valid && touched}"
      {type}
      {placeholder}
      {id}
      {value}
      {min}
      use:init
      on:input
      on:keydown={handleEnter}
      on:blur={() => {
        touched = true
      }}
    >
  {/if}

  {#if validityMessage && !valid && touched}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
