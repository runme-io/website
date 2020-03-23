<script>
    const date = new Date()
    const year = date.getFullYear()
</script>

<footer>
    <section class="jexia-footer">
        <nav>
            <ul>
                <li><a href="/">Generate</a></li>
                <li><a href="/how-it-works">How it works</a></li>
            </ul>
        </nav>
        <p>Build for communities that are making impacts with the power of software tools. <br>Runme.io is an initiative of <a target="_blank" href="https://jexia.com">Jexia</a>. © Copyright {year}. All rights reserved.</p>
        <img src="/images/technology/jexia.svg" alt="Jexia logo"/>
        <img src="/images/technology/digital-ocean.svg" alt="Digital Ocean logo"/>
    </section>
</footer>

<style lang="sass">
    @import '../../../assets/style/theme'

    footer
        margin-top: auto

    .jexia-footer
        margin-top: calc(#{$spacing} * 2)
        padding: $spacing
        background-color: #f4f4f4
        text-align: center
        font-family: $font-family-jexia
        font-size: 1.4rem

        nav
            text-align: center
            margin-bottom: 3.5rem

            ul
                display: inline-block
                list-style: none

                li
                    display: inline-block
                    padding: 0 .5rem

                    &:not(:last-child)
                        &:after
                            content: '|'
                            padding-left: 1rem
                            color: $gray

                    a
                        color: $gray

        p
            color: $gray

        img
            margin-top: 2rem
            margin-right: 2rem
            display: inline-block
            height: 5rem
</style>
