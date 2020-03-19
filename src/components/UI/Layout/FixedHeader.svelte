<script>
    import CountDown from '../Counter/CountDown.svelte'
    import CountUp from '../Counter/CountUp.svelte'

    export let countDown = false
    export let countUp = false
    export let title = null
    export let timerTitle = ''
</script>

<header>
    <div class="logo-svg">
        <a href="/">
            <img src="/static/button.svg" alt="logo">
        </a>
    </div>
    <h1>{title}</h1>
    {#if timerTitle}
        <div class="counter">
            <span class="title">{timerTitle}</span>
            <span class="timer">
                {#if countDown}<CountDown/>{/if}
                {#if countUp}<CountUp/>{/if}
            </span>
        </div>
    {/if}
</header>

<style lang="sass">
    @import "../../../assets/style/theme"
    @import "../../../assets/style/mixins"

    header
        position: sticky
        top: 0
        z-index: 1
        padding: 2rem $spacing
        background-color: $primary-color
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: flex-start
        align-items: center
        @include dashed-line()

        h1
            padding-left: $spacing
            padding-right: $spacing
            line-height: 3rem
            font-size: 1.8rem
            width: 50%
            align-self: center
            margin: 0 auto

            @media screen and (max-width: 720px)
                padding: 2rem 0 0 0
                width: 100%
                text-align: center

        .logo-svg
            width: 200px

            @media screen and (max-width: 720px)
                width: 100%
                text-align: center

            a
                border: 0

                img
                    width: 20rem
                    display: inline-block

        .counter
            align-self: center
            text-align: center

            @media screen and (min-width: 500px) and (max-width: 720px)
                position: absolute
                top: 2rem
                right: $spacing

            @media screen and (max-width: 500px)
                width: 100%
                margin-top: 2rem

            .title
                display: block
</style>
