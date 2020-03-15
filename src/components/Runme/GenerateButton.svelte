<script>
    export let disabled = false
    export let loading = false

</script>

<button {disabled} class="btn" on:click>
    <slot/>
    {#if loading}
        <img class="loading" alt="loading" src="/svg/loader.svg">
    {/if}
</button>

<style lang="sass">
    @import '../../assets/style/theme'

    .btn
        display: inline-block
        padding: .5rem 1.5rem
        text-align: center
        font-size: 1.8rem
        color: $white
        background-color: #555
        border: 1px solid transparent
        border-radius: .3rem
        margin-top: 2rem
        margin-bottom: 2rem
        cursor: pointer
        outline: none
        box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.4)
        transition: .3s all

        &:active
            box-shadow: 0.2rem 0.2rem 0.1rem rgba(0, 0, 0, 0.4)

        &:disabled
            cursor: not-allowed
            background-color: #767676

    .loading
        display: inline
        height: 2rem

</style>
