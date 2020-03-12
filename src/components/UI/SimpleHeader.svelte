<header>
    <div class="logo-svg">
        <img src="/svg/jexiaLogo.svg" alt="logo">
    </div>
    <h1>Run your application from any public Git-repo with one click</h1>
    <div class="counter">
        <span class="title">Build time</span>
        <span class="timer">
            <span>0</span>
            <span>05</span>
            <span>35</span>
        </span>
    </div>
</header>

<style lang="sass">
    @import "../../assets/style/theme"
    @import "../../assets/style/mixins"

    header
        padding: 3rem $spacing
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

            .timer
                span
                    &:after
                        content: '.'
                        display: inline-block
</style>
