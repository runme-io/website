<script>
    export let href = null
    export let alt = 'runme button'
</script>

<style lang="sass">
    @import '../../assets/style/theme.sass'

    img
        height: 20px
        display: inline
</style>

<a {href} class="runme-button" target="_blank">
    <img src="/svg/runmeButton.svg" {alt}>
</a>
