<script>
    import SocialIcons from '../../UI/SocialIcons.svelte'
    import Donation from '../../UI/Donation.svelte'
</script>

<section>
    <div class="container">
        <div class="runme-footer">
            <p>If you Like this project, you can show your appreciation by <br>helping us spread the word or making a small donation.</p>
            <div class="social">
                <SocialIcons/>
            </div>
            <div class="donation">
                <Donation/>
            </div>
        </div>
    </div>
</section>

<style lang="sass">
    @import '../../../assets/style/theme'
    @import '../../../assets/style/mixins'

    section
        @include dashed-line(top)
        margin-top: 10rem

        .runme-footer
            display: flex
            flex-wrap: wrap
            flex-direction: row
            margin: $spacing auto 0 auto
            justify-content: center
            padding: $spacing
            padding-bottom: 0
            width: 80%
            font-size: 1.6rem
            text-align: center

            p
                width: 100%

            @media screen and (max-width: 992px)
                width: 100%

            > div
                &:first-child
                    padding-right: $spacing

                &:last-child
                    padding-left: $spacing

            .social,
            .donation
                margin-top: 2rem
</style>
