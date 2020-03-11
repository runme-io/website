<header>
    <div class="logo">
        <div class="logo-svg">
            <img src="/svg/jexiaLogo.svg" alt="logo">
        </div>
        <h1>Run your application from any public Git-repo with one click</h1>
    </div>
    <div class="header-image">
        <img src="/svg/runmeHeaderImage.svg" alt="header image">
    </div>
</header>

<style lang="sass">
    @import "../../assets/style/theme"
    header
        padding-left: $spacing
        padding-right: $spacing
        background-color: $primary-color
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: flex-start
        background-image: linear-gradient(to right, black 33%, rgba(255,255,255, .5) 0%)
        background-position: bottom
        background-size: 2rem .1rem
        background-repeat: repeat-x

    .header-image
        align-self: flex-end
        margin-left: auto
        vertical-align: top

        img
            height: 300px

    .logo
        width: 50%

        h1
            line-height: 3.5rem
            font-size: 2.5rem

        .logo-svg
            width: 200px
            margin-top: 75px
            margin-bottom: 40px
</style>
