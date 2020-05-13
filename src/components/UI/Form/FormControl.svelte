<script>
  export let required = false
  export let compact = false
  export let hasError = false
  export let validityMessage = ''
</script>

<div
  class="form-control"
  class:compact={compact}
  class:required={required}
>
  <slot />
  {#if validityMessage && hasError}
    <p class="error-message">{validityMessage}</p>
  {/if}
</div>
