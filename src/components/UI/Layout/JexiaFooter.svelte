<script>
    const date = new Date()
    const year = date.getFullYear()
</script>

<footer>
    <section class="jexia-footer">
        <nav>
            <ul>
                <li><a href="/">Generate</a></li>
                <li><a href="/about-us">About us</a></li>
                <li><a href="/how-it-works">How it works</a></li>
            </ul>
        </nav>
        <p>Build for communities that are making impacts with the power of software tools. <br>Runme.io is an initiative of <a target="_blank" href="https://jexia.com">Jexia</a>. © Copyright {year}. All rights reserved.</p>
        <img src="/images/jexia-logo-grey.svg" alt="Jexia logo"/>
        <img src="/images/digital-ocean-logo-grey.svg" alt="Digital Ocean logo"/>
    </section>
</footer>

<style lang="sass">
    @import '../../../assets/style/theme'
    $text-color: #919191

    footer
        margin-top: auto

    .jexia-footer
        margin-top: $spacing
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
                            color: $text-color

                    a
                        color: $text-color

        p
            color: $text-color

        img
            margin-top: 2rem
            margin-right: 2rem
            display: inline-block
            height: 5rem
</style>
