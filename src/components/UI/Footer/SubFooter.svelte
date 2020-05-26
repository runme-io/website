<script>
  import SocialIcons from './SocialIcons.svelte'
  import Donation from './Donation.svelte'
  import TechnologyLogos from './TechnologyLogos.svelte'

  export let showTechnologyIcons = false
</script>

<section>
  <div class="container">
    {#if showTechnologyIcons}
        <div class="footer">
        <TechnologyLogos />
      </div>
    {/if}
    <div class="footer">
      <p>
        If you Like this project, you can show your appreciation by <br>helping us spread the word or making a small donation.
      </p>
      <div class="blocks">
        <div class="social">
          <SocialIcons/>
        </div>
        <div class="donation">
          <Donation/>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="sass">
  @import './assets/style/theme'
  @import './assets/style/mixins'

  section
    @include dashed-line(top)
    margin-top: calc(#{$spacing} * 2)
    padding-top: calc(#{$spacing} * 2)

    .footer
      margin: 0 auto
      width: 80%
      font-size: 1.6rem
      text-align: center

      &:nth-child(2)
        @include dashed-line(top)
        padding-top: $spacing
        margin-top: $spacing

      p
        width: 100%

      @media screen and (max-width: 992px)
        width: 100%

      .blocks
        margin-top: 2rem
        display: flex
        flex-wrap: wrap
        flex-direction: row
        justify-content: center

        > div
          &:first-child
            padding-right: $spacing

          &:last-child
            padding-left: $spacing

        @media screen and (max-width: 500px)
          flex-direction: column

          div
            padding: 0

      .social,
      .donation
        margin-top: 2rem
</style>
