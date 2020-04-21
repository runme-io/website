<script>
    import { menuItems } from '../../Data/menu'

    export let textColorLight = false

    let textColorClass = textColorLight ? 'light' : ''

    const items = menuItems
</script>

<nav class="{textColorClass}">
    <ul>
        {#each items as item}
            <li><a target={item.newWindow ? 'target="_blank"' : null} href={item.link}>{item.label}</a></li>
        {/each}
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
