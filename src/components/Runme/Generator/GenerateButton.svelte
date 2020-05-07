<script>
    import Loader from '../../UI/Loader/Loader.svelte'
    import Button from '../../UI/Button.svelte'

    export let disabled = false
    export let loading = false
</script>

<Button {disabled} big={true} on:click>
    <slot/>
    {#if loading}
        <div class="loading">
            <Loader size="20" />
        </div>
    {/if}
</Button>

<style lang="sass">
    @import './assets/style/theme'

    .loading
        display: inline
        height: 2rem
</style>
