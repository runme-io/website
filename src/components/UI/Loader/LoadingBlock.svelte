<script>
    import Loader from './Loader.svelte'

    export let size = 100
    export let color = '#000'
</script>

<div class="loading">
    <Loader {size} {color}/>
    <p><slot /></p>
</div>

<style lang="sass">
    @import '../../../assets/style/theme'

    .loading
        text-align: center

        p
            padding-top: $spacing
</style>
