<header>
    <div class="container">
        <div class="logo">
            <div class="logo-svg">
                <a href="/">
                    <img src="/static/button.svg" alt="logo">
                </a>
            </div>
            <h2>Run your application from any public Git-repo with one click</h2>
        </div>
        <div class="header-image">
            <img src="/images/runmeHeaderImage.svg" alt="header image">
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

        @media screen and (max-width: 720px)
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

        @media screen and (max-width: 720px)
            text-align: center
            width: 100%
            padding-bottom: 2rem

        h2
            line-height: 4rem
            font-size: 3rem

            @media screen and (max-width: 992px)
                font-size: 2rem

            @media screen and (max-width: 70px)
                font-size: 1.8rem

        .logo-svg
            width: 25rem
            margin-top: 7.5rem
            margin-bottom: 4rem

            @media screen and (max-width: 720px)
                margin-left: auto
                margin-right: auto
                margin-top: $spacing
                margin-bottom: 2rem

            a
                border: 0
</style>
