<script>
    import { createEventDispatcher } from 'svelte'

    export let controlType = null
    export let id = null
    export let label = null
    export let rows = null
    export let value
    export let type = 'text'
    export let valid = true
    export let validityMessage = ''
    export let placeholder = ''

    const dispatch = createEventDispatcher()

    let touched = false

    function handleEnter (event) {
      if (event.which === 13) {
          touched = true
          dispatch('enter')
      }
    }
</script>

<style lang="sass">
    @import "../../assets/style/theme"
    @import "../../assets/style/form"

    input,
    textarea
        display: block
        width: 100%
        font: inherit
        border: 1px solid $input-main-color
        background: white
        padding: 1rem 1.5rem
        transition: border-color .1s ease-out

        &:focus
            border-color: #e40763
            outline: none

        &::placeholder
            color: $input-main-color

    label
        @include label()

    .form-control
        padding: .5rem 0
        width: 100%
        margin: .25rem 0

    .invalid
        border-color: red
        background: #fde3e3

    .error-message
        color: red
        margin: .25rem 0
</style>

<div class="form-control">
    {#if label}<label for={id}>{label}</label>{/if}
    {#if controlType === "textarea"}
        <textarea class:invalid="{!valid && touched}" {rows} {placeholder} {id} bind:value on:blur={() => touched = true} />
    {:else}
        <input class:invalid="{!valid && touched}" {type} {placeholder} {id} {value} on:input on:keydown={handleEnter} on:blur={() => touched = true} />
    {/if}
    {#if validityMessage && !valid && touched}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>
