<script>
    export let title = null
    let countDown = null
    let showTimer = 0

    countDown = 1 * 10

    let timer = countDown
    let minutes
    let seconds
    setInterval(function () {
        minutes = Math.floor(timer / 60)
        seconds = Math.floor(timer % 60)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        showTimer = minutes + ":" + seconds

        --timer
    }, 1000)

</script>

<header>
    <div class="logo-svg">
        <img src="/svg/jexiaLogo.svg" alt="logo">
    </div>
    <h1>{title}</h1>
    <div class="counter">
        <span class="title">Build time</span>
        <span class="timer">
            {showTimer}
        </span>
    </div>
</header>

<style lang="sass">
    @import "../../assets/style/theme"
    @import "../../assets/style/mixins"

    header
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

        .counter
            align-self: center
            margin-left: auto

            .title
                display: block
</style>
