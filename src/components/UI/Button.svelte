<script>
    export let type = 'button'
    export let href = null
    export let mode = null
    export let disabled = false
    export let flex = false
    export let big = false
</script>

<style lang="sass">
    @import '../../assets/style/theme'

    button,
    a
        font: inherit
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
            background: #ccc
            border-color: #ccc
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
            color: #ccc

    .default
        background: transparent
        color: $buttonBackground
        box-shadow: none !important
        border: none !important
        padding: 0 !important
</style>

{#if href}
    <a {href}>
        <slot />
    </a>
{:else}
    <button class:flex class:big class="{mode}" {type} on:click {disabled}>
        <slot />
    </button>
{/if}
