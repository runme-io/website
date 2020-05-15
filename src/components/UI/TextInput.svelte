<script>
  import { createEventDispatcher } from 'svelte'
  import FormControl from './Form/FormControl.svelte'

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

  $: isInvalid = !valid && touched

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

<FormControl
  required={$$restProps.required}
  hasError={isInvalid}
  {compact}
  {validityMessage}
>
  {#if label}<label for={id}>{label}</label>{/if}

  {#if controlType === 'textarea'}
    <textarea
      class:invalid={isInvalid}
      {rows}
      {placeholder} {id}
      bind:value
      on:blur={() => (touched = true)}
      {...$$restProps}
    />
  {:else}
    <input
      class:invalid={isInvalid}
      {type}
      {placeholder}
      {id}
      {value}
      {min}
      use:init
      on:input
      on:keydown={handleEnter}
      on:blur={() => (touched = true)}
      {...$$restProps}
    >
  {/if}
</FormControl>
