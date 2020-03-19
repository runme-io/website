<header>
    <div class="container">
        <div class="logo">
            <div class="logo-svg">
                <a href="/">
                    <img src="/static/button.svg" alt="logo">
                </a>
            </div>
            <h1>Run your application from any public Git-repo with one click</h1>
        </div>
        <div class="header-image">
            <img src="/svg/runmeHeaderImage.svg" alt="header image">
        </div>
    </div>
</header>

<style lang="sass">
    @import "../../../assets/style/theme"
    @import "../../../assets/style/mixins"

    header
        background-color: $primary-color
        @include dashed-line()

        .container
            display: flex
            flex-direction: row
            flex-wrap: wrap
            justify-content: flex-start

    .header-image
        align-self: flex-end
        margin-left: auto
        vertical-align: top

        @media screen and (max-width: 670px)
            display: none

        @media screen and (max-width: 850px)
            margin-bottom: auto
            margin-top: auto

        img
            width: 340px

            @media screen and (max-width: 850px)
                width: 240px

    .logo
        width: 50%
        padding-bottom: $spacing

        @media screen and (max-width: 670px)
            text-align: center
            width: 100%

        h1
            line-height: 3.5rem
            font-size: 2.5rem

            @media screen and (max-width: 992px)
                font-size: 2rem

            @media screen and (max-width: 780px)
                font-size: 1.8rem

        .logo-svg
            width: 25rem
            margin-top: 7.5rem
            margin-bottom: 4rem

            @media screen and (max-width: 670px)
                margin-left: auto
                margin-right: auto

            a
                border: 0
</style>
