<script>
    export let controlType = null
    export let id = null
    export let label = null
    export let rows = null
    export let value
    export let type = 'text'
    export let valid = true
    export let validityMessage = ''
    export let placeholder = ''

    let touched = false
</script>

<style lang="sass">
    input,
    textarea
        display: block
        width: 100%
        font: inherit
        border: 1px solid #bfbfbf
        background: white
        padding: 1rem 1.5rem
        transition: border-color 0.1s ease-out

        &:focus
            border-color: #e40763
            outline: none

        &::placeholder
            color: #bfbfbf

    label
        display: block
        margin-bottom: 0.5rem
        width: 100%
        font-weight: 600

    .form-control
        padding: 0.5rem 0
        width: 100%
        margin: 0.25rem 0

    .invalid
        border-color: red
        background: #fde3e3

    .error-message
        color: red
        margin: 0.25rem 0
</style>

<div class="form-control">
    {#if label}<label for={id}>{label}</label>{/if}
    {#if controlType === "textarea"}
        <textarea class:invalid="{!valid && touched}" {rows} {placeholder} {id} bind:value on:blur={() => touched = true} />
    {:else}
        <input class:invalid="{!valid && touched}" {type} {placeholder} {id} {value} on:input on:blur={() => touched = true} />
    {/if}
    {#if validityMessage && !valid && touched}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>
