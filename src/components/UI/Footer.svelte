<script>
    import SocialIcons from '../UI/SocialIcons.svelte'
    import Donation from '../UI/Donation.svelte'
    const date = new Date()
    const year = date.getYear()

</script>

<footer>
    <section class="runme-footer">
        <div class="social">
            <p>If you like it, help us spread the word!</p>
            <div class="social-icons">
                <SocialIcons/>
            </div>

        </div>
        <div class="donation">
            <p>If you like this project, please keep the project alive with a small donation.</p>
            <Donation/>
        </div>
    </section>
    <section class="jexia-footer">
        <p>Runme.io is a project of <a target="_blank" href="https://jexia.com">Jexia</a>. &copy; Copyright {year}. All right reserved.</p>
        <img src="/svg/jexia-logo.svg" alt="jexia logo"/>
    </section>
</footer>

<style lang="sass">
    @import '../../assets/style/theme'
    @import '../../assets/style/mixins'

    footer
        @include dashed-line(top)
        margin-top: $spacing

    .runme-footer
        display: flex
        flex-wrap: wrap
        flex-direction: row
        margin: $spacing auto 0 auto
        padding: $spacing
        width: 80%
        font-size: 1.6rem
        text-align: center

        @media screen and (max-width: 992px)
            width: 100%

        > div
            width: 50%

            &:first-child
                padding-right: $spacing

            &:last-child
                padding-left: $spacing

            @media screen and (max-width: 580px)
                width: 100%

                &:first-child
                    padding-right: 0

                &:last-child
                    padding-left: 0
                    margin-top: $spacing

        .social-icons
            margin-top: 3rem

    .jexia-footer
        padding: $spacing
        background-color: #f4f4f4
        text-align: center
        font-family: $font-family-jexia

        p
            color: #919191

        img
            padding-top: 1rem
            display: inline-block


</style>
