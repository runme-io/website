<script>
    const date = new Date()
    const year = date.getYear()
</script>

<footer>
    <section class="jexia-footer">
        <p>Runme.io is a project of <a target="_blank" href="https://jexia.com">Jexia</a>. &copy; Copyright {year}. All right reserved.</p>
        <img src="/svg/jexia-logo.svg" alt="jexia logo"/>
    </section>
</footer>

<style lang="sass">
    @import '../../../assets/style/theme'
    @import '../../../assets/style/mixins'

    footer
        @include dashed-line(top)
        margin-top: $spacing

    .jexia-footer
        padding: $spacing
        background-color: #f4f4f4
        text-align: center
        font-family: $font-family-jexia

        p
            color: #919191

        img
            padding-top: 1rem
            display: inline-block
</style>
