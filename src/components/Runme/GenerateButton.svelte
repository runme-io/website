<script>
    import Loader from '../UI/Loader.svelte'
    import Button from '../UI/Button.svelte'

    export let disabled = false
    export let loading = false
</script>

<div class="generate-button">
    <Button {disabled} big={true} on:click>
        <slot/>
        {#if loading}
            <div class="loading">
                <Loader size="20" />
            </div>
        {/if}
    </Button>
</div>

<style lang="sass">
    @import '../../assets/style/theme'

    .generate-button
        margin: 2rem 0

    .loading
        display: inline
        height: 2rem
</style>
