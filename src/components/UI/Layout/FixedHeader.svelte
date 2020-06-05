<script>
  import { onDestroy } from 'svelte'
  import { header } from '../../Stores/Header'
  import CountDown from '../Counter/CountDown.svelte'
  import CountUp from '../Counter/CountUp.svelte'
  import ActionDropdown from '../Header/ActionDropdown.svelte'

  export let title = 'Run your application from any public Git-repo with one click'
  export let timerTitle = ''

  let showBlock = false
  let countDown = false
  let countUp = false
  let failed = false
  let failedStatus = ''
  let deployUrl = ''
  let applicationUrl = ''
  let dockerImage = null
  let showPlaceholderDeployButton = false // TODO remove when deployment is possible

  const unsubscribe = header.subscribe(header => {
    countDown = header.countDown
    countUp = header.countUp
    failed = header.failed
    failedStatus = header.failedStatus
    deployUrl = header.deployUrl
    applicationUrl = header.applicationUrl
    showPlaceholderDeployButton = header.showPlaceholderDeployButton // TODO remove when deployment is possible

    if (header.dockerImage) {
      dockerImage = header.dockerImage
    }

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

<style lang="sass">
  @import "./assets/style/theme"
  @import "./assets/style/mixins"

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
      display: flex
      flex-direction: column
      align-items: center
      padding-left: $spacing
      padding-right: $spacing
      width: 60%

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

<header>
  <div class="logo-svg">
    <a href="/">
      <img src="/static/button-beta.svg" alt="logo">
    </a>
  </div>
  <div class="titles">
    <h1>{title}</h1>
    <ActionDropdown {showPlaceholderDeployButton} {dockerImage} {deployUrl} {applicationUrl}/>
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
