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
            <img src="/svg/jexiaLogo.svg" alt="logo">
        </a>
    </div>
    <h1>{title}</h1>
    <div class="counter">
        <span class="title">{timerTitle}</span>
        <span class="timer">
            {#if countDown}<CountDown/>{/if}
            {#if countUp}<CountUp/>{/if}
        </span>
    </div>
</header>

<style lang="sass">
    @import "../../../assets/style/theme"
    @import "../../../assets/style/mixins"

    header
        position: sticky
        top: 0
        z-index: 1
        height: 10rem
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

        .logo-svg
            width: 200px

            a
                border: 0

        .counter
            align-self: center
            text-align: center

            .title
                display: block
</style>
