<script>
  import { onMount } from 'svelte'
  import { onDestroy } from 'svelte'
  import { goto } from '@sapper/app'
  import { queryParam } from '../Helpers'
  import { build } from '../components/Stores/Build'
  import { header } from '../components/Stores/Header'
  import FixedHeader from '../components/UI/Header/FixedHeader.svelte'
  import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
  import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'
  import CountDown from '../components/UI/Counter/CountDown.svelte'
  import MetaData from '../components/UI/MetaData.svelte'

  let loading = true
  let hasError = false
  let generalError = false
  let rateLimitError = false
  let showDefaultErrorMsg = true

  $: hasError = generalError || rateLimitError

  const appId = queryParam().get('app_id')

  const unsubHeader = header.subscribe(({ countDownFinish }) => {
    if (countDownFinish) {
      location.reload()
    }
  })

  const unsubBuild = build.subscribe(({ build_id: buildId, error }) => {
    if (error && error.nextBuild) {
      loading = false
      rateLimitError = true
      showDefaultErrorMsg = false
      header.showCountDown(error.nextBuild, 'Next build in')
    } else if (error) {
      loading = false
      generalError = true
    } else if (buildId) {
      goto(`/build?build_id=${buildId}`)
    }
  })

  onMount(() => {
    build.start(appId)
  })

  onDestroy(() => {
    unsubBuild()
    unsubHeader()
  })
</script>

<MetaData title="Prepare you application to run"/>

<FixedHeader/>

<ContentLayout>
  {#if loading}
    <LoadingBlock>
      You application is firing up, please hang with us so we can collect your repo info and start building your
      application.
    </LoadingBlock>
  {:else if hasError}
    <h1>Oops!</h1>
    <p>
      {#if rateLimitError}
        There are too many build triggers for this particular repo.
        Please hang on, Runme will try to run it in a new build, after
        <CountDown/> minutes.
      {/if}

      {#if generalError}
        No app has been found with ID "{appId}.
        Please <a href="/">(re)generate a new button</a> in order to run your application.
      {/if}

      {#if showDefaultErrorMsg}
        Please go back to the <a href="/">generator</a> page and create a button and run url.
      {/if}
    </p>
  {/if}
</ContentLayout>
