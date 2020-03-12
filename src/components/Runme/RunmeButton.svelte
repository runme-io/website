<script>
    export let href = null
    export let alt = ''
</script>

<style lang="sass">
    @import '../../assets/style/theme.sass'

    img
        height: 20px
        display: inline
</style>

<a {href} class="runme-button">
    <img src="/svg/runmeButton.svg" {alt}>
</a>
