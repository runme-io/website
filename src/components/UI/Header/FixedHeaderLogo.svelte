<script>
  export let animated = false
</script>

<style lang="sass">
  @keyframes rotate
    0%
      transform: rotate(0)

    30%
      transform: rotate(130deg)

    60%
      transform: rotate(70deg)

    80%
      transform: rotate(100deg)

    100%
      transform: rotate(90deg)

  .animated
    transform-origin: bottom left
    animation: rotate 0.75s 1s both

  .logo-svg
    a
      border: 0

      img
        width: 20rem
        display: inline-block

        @media screen and (max-width: 1200px)
          width: 17rem

        @media screen and (max-width: 900px)
          width: 15rem
</style>

<div class="logo-svg" class:animated>
  <a href="/">
    <img src="/static/button-beta.svg" alt="logo">
  </a>
</div>
