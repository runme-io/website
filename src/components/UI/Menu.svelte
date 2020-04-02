<script>
    export let textColorLight = false

    let textColorClass = textColorLight ? 'light' : ''
</script>

<nav class="{textColorClass}">
    <ul>
        <li><a href="/">Generate</a></li>
        <li><a href="/how-it-works">How it works</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<style lang="sass">
    @import "../../assets/style/theme"

    nav
        font-family: $font-family-jexia
        font-size: 1.4rem
        text-align: center

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

    nav.light
        a
            color: $white
            text-decoration: none
</style>
