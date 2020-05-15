<script>
  import CountDown from '../Counter/CountDown.svelte'
  import CountUp from '../Counter/CountUp.svelte'
  import { header } from '../../Stores/Header'
  import { onDestroy } from 'svelte'
  import Button from '../Button.svelte'

  export let title = 'Run your application from any public Git-repo with one click'
  export let timerTitle = ''

  let showBlock = false
  let countDown = false
  let countUp = false
  let failed = false
  let failedStatus = ''
  let deployUrl

  const unsubscribe = header.subscribe(header => {
    countDown = header.countDown
    countUp = header.countUp
    failed = header.failed
    failedStatus = header.failedStatus
    deployUrl = header.deployUrl

    if (header.timerTitle) {
      timerTitle = header.timerTitle
    }

    if (failed) {
      timerTitle = 'Status'
    }

    if (countDown || countUp || failed) {
      showBlock = true
    }
  })

  onDestroy(unsubscribe)
</script>

<header>
  <div class="logo-svg">
    <a href="/">
      <img src="/static/button-beta.svg" alt="logo">
    </a>
  </div>
  <div class="titles">
    <h1>{title}</h1>
    {#if deployUrl}
      <Button title="Deploy your application to Jexia" target="_blank" href={deployUrl}>Deploy on Jexia</Button>
    {/if}
  </div>

  {#if showBlock}
    <div class="counter">
      <span class="title">{timerTitle}</span>
      <span class="timer">
        {#if failed}
          <span class="error">{failedStatus}</span>
        {:else if countDown}
          <CountDown/>
        {:else if countUp}
          <CountUp/>
        {/if}
      </span>
    </div>
  {/if}
</header>

<style lang="sass">
  @import "../../../assets/style/theme"
  @import "../../../assets/style/mixins"

  header
    position: sticky
    top: 0
    z-index: 1
    padding: 2rem $spacing
    background-color: $primary-color
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
    @include dashed-line()

    .titles
      padding-left: $spacing
      padding-right: $spacing
      width: 60%
      align-self: center
      margin: 0 auto
      text-align: center

      @media screen and (max-width: 1200px)
        width: 70%

      @media screen and (max-width: 720px)
        width: 100%
        padding: 1rem 0 0 0

      h1
        line-height: 3rem
        font-size: 1.8rem
        margin-bottom: 1rem

        @media screen and (max-width: 1200px)
          font-size: 1.6rem
          line-height: 2rem

        @media screen and (max-width: 720px)
          text-align: center
          font-size: 1.4rem
          line-height: 1.8rem

    .logo-svg
      @media screen and (max-width: 720px)
        width: 100%
        text-align: center

      a
        border: 0

        img
          width: 20rem
          display: inline-block

          @media screen and (max-width: 1200px)
            width: 17rem

          @media screen and (max-width: 900px)
            width: 15rem

    .counter
      align-self: center
      text-align: center

      @media screen and (max-width: 1200px)
        font-size: 1.4rem

      @media screen and (min-width: 500px) and (max-width: 720px)
        position: absolute
        top: 2rem
        right: $spacing

      @media screen and (max-width: 500px)
        width: 100%
        margin-top: 1rem
        font-size: 1.2rem

      .title
        display: block

      .error
        color: $warning
</style>
