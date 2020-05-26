<script>
  import Menu from '../Menu.svelte'

  const date = new Date()
  const year = date.getFullYear()
</script>

<footer>
  <section class="jexia-footer">
    <Menu/>
    <p>
      Build for communities that are making impacts with the power of software tools.<br>
      Runme.io is initiated by <a target="_blank" href="https://jexia.com">Jexia</a> in cooperation with
      <a target="_blank" href="https://www.digitalocean.com/">Digital Ocean</a>. © Copyright {year}. All rights reserved.</p>
    <img src="/images/technology/jexia.svg" alt="Jexia logo"/>
    <img src="/images/technology/digital-ocean.svg" alt="Digital Ocean logo"/>
  </section>
</footer>

<style lang="sass">
  @import './assets/style/theme'

  footer
    margin-top: auto

  .jexia-footer
    margin-top: calc(#{$spacing} * 2)
    padding: $spacing
    background-color: #f4f4f4
    text-align: center
    font-family: $font-family-jexia
    font-size: 1.4rem

    p
      margin-top: 3.5rem
      color: $gray

    img
      margin-top: 2rem
      margin-right: 2rem
      display: inline-block
      height: 5rem
</style>
