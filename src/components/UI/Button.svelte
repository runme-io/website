<script>
    export let type = 'button'
    export let href = null
    export let target = null
    export let mode = null
    export let disabled = false
    export let flex = false
    export let big = false

    let restProps

   $: classes = `${mode || ''} ` + ($$props.class || '')
   $: {
       restProps = $$restProps
       delete restProps.class
   }
</script>

<style lang="sass">
    @import './assets/style/theme'

    button,
    a
        border: .1rem solid $buttonBackground
        background: $buttonBackground
        padding: .5rem 1rem
        color: $white
        border-radius: .3rem
        box-shadow: .2rem .2rem .5rem rgba(0, 0, 0, .4)
        transition: .3s all
        cursor: pointer
        text-decoration: none

        &:hover,
        &:active
            box-shadow: .2rem .2rem .1rem rgba(0, 0, 0, .4)

    button
        &.big
            font-size: 1.8rem
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
        color: $buttonBackground
        box-shadow: none

        &:hover,
        &:active
            background: #ffc7de
            box-shadow: none

        &:disabled,
        &:disabled:hover,
        &:disabled:active
            background: transparent
            color: $gray-light

    .default
        background: transparent
        color: $buttonBackground
        box-shadow: none !important
        border: none !important
        padding: 0 !important
</style>

{#if href}
    <a
        {...restProps}
        {href}
        {target}
        class={classes}
    >
        <slot />
    </a>
{:else}
    <button
        {...restProps}
        class:flex
        class:big
        class={classes}
        {type}
        {disabled}
        on:click
    >
        <slot />
    </button>
{/if}
