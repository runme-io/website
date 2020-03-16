<header>
    <div class="logo">
        <div class="logo-svg">
            <a href="/">
                <img src="/svg/jexiaLogo.svg" alt="logo">
            </a>
        </div>
        <h1>Run your application from any public Git-repo with one click</h1>
    </div>
    <div class="header-image">
        <img src="/svg/runmeHeaderImage.svg" alt="header image">
    </div>
</header>

<style lang="sass">
    @import "../../../assets/style/theme"
    @import "../../../assets/style/mixins"

    header
        padding-left: $spacing
        padding-right: $spacing
        background-color: $primary-color
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: flex-start
        @include dashed-line()

    .header-image
        align-self: flex-end
        margin-left: auto
        vertical-align: top

        @media screen and (max-width: 670px)
            display: none

        img
            height: 300px

            @media screen and (max-width: 780px)
                height: 200px

    .logo
        width: 50%
        padding-bottom: $spacing

        @media screen and (max-width: 780px)
            width: 60%

        @media screen and (max-width: 670px)
            width: 100%

        h1
            line-height: 3.5rem
            font-size: 2.5rem

            @media screen and (max-width: 992px)
                font-size: 2rem

            @media screen and (max-width: 780px)
                font-size: 1.8rem

        .logo-svg
            width: 200px
            margin-top: 75px
            margin-bottom: 40px

            a
                border: 0
</style>
