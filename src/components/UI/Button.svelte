<script>
    export let type = 'button'
    export let href = null
    export let mode = null
    export let color = null
    export let disabled = false
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
        border-radius: .5rem
        box-shadow: .2rem .2rem .5rem rgba(0, 0, 0, .4)
        transition: .3s all
        cursor: pointer
        text-decoration: none

        &:hover,
        &:active
            box-shadow: .2rem .2rem .1rem rgba(0, 0, 0, .4)

    button:focus
        outline: none

    button:disabled,
    button:disabled:hover,
    button:disabled:active
        background: #ccc
        border-color: #ccc
        color: #959595
        box-shadow: none
        cursor: not-allowed

    /*.success*/
    /*    background: #01a129*/
    /*    border-color: #01a129*/

    /*.success:hover,*/
    /*.success:active*/
    /*    background: #1ac745*/
    /*    border-color: #1ac745*/

    .outline
        background: transparent
        color: $buttonBackground
        box-shadow: none

    .outline:hover,
    .outline:active
        background: #ffc7de
        box-shadow: none

    .outline:disabled,
    .outline:disabled:hover,
    .outline:disabled:active
        background: transparent
        color: #ccc

    .default
        background: transparent
        color: $buttonBackground
        box-shadow: none !important
        border: none !important

    /*.outline.success*/
    /*    border-color: #01a129*/
    /*    color: #01a129*/

    /*.outline.success:hover,*/
    /*.outline.success:active*/
    /*    background: #c2ffd1*/
</style>

{#if href}
    <a {href}>
        <slot />
    </a>
{:else}
    <button class="{mode} {color}" {type} on:click {disabled}>
        <slot />
    </button>
{/if}
