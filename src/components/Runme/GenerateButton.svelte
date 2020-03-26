<script>
    import Loader from '../UI/Loader.svelte'

    export let disabled = false
    export let loading = false
</script>

<button {disabled} class="btn" on:click>
    <slot/>
    {#if loading}
        <div class="loading">
            <Loader size="20" />
        </div>
    {/if}
</button>

<style lang="sass">
    @import '../../assets/style/theme'

    /*TODO use the <Button/> component here*/

    .btn
        display: inline-block
        padding: .5rem 1.5rem
        text-align: center
        font-size: 1.8rem
        color: $white
        background-color: $buttonBackground
        border: 1px solid transparent
        border-radius: .3rem
        margin-top: 2rem
        margin-bottom: 2rem
        cursor: pointer
        outline: none
        box-shadow: .2rem .2rem .5rem rgba(0, 0, 0, .4)
        transition: .3s all

        &:active
            box-shadow: .2rem .2rem .1rem rgba(0, 0, 0, .4)

        &:disabled
            cursor: not-allowed
            background-color: $buttonDisabledBackground

    .loading
        display: inline
        height: 2rem

</style>
