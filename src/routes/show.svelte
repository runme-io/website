<script>
  import { onMount } from 'svelte'
  import { onDestroy } from 'svelte'
  import { queryParam } from '../Helpers'
  import { DEPLOYMENT } from '../env'
  import { DISCORD_LINK } from '../Data/menu'
  import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
  import { application } from '../components/Stores/Application'
  import { build } from '../components/Stores/Build'
  import { header } from '../components/Stores/Header'
  import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
  import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'
  import MetaData from '../components/UI/MetaData.svelte'

  let src
  let iframeLoaded = false
  let errorMsg
  let pollingInterval
  let pollingAttempt = 0
  let appId

  const maxPollingAttempt = 10
  const intervalTimer = 5000
  const buildId = queryParam().get('build_id')
  const unsubscribe = {}
  const discordLink = DISCORD_LINK

  const showError = (msg) => {
    errorMsg = msg
    clearInterval(pollingInterval)
  }

  const urlExists = async (url) => {
    const response = await fetch(url, { redirect: 'manual' })
    if (response.status > 500) {
      throw new Error('Failed to fetch')
    }
  }

  const loadUrl = (url) => {
    clearInterval(pollingInterval) // clear previous interval
    pollingAttempt = 1 // reset value

    pollingInterval = setInterval(async () => {
      try {
        await urlExists(url)

        clearInterval(pollingInterval)
        application.get(appId)

        // update the template variables
        src = url
        header.setApplicationUrl(url)
        iframeLoaded = true
      } catch (e) {
        if (pollingAttempt++ > maxPollingAttempt) {
          showError(`The app you are trying to reach is unavailable. If you suspect it's an error, please <a target="_blank" href="${discordLink}">let us now</a>`)
        }
      }
    }, intervalTimer)
  }

  const toQueryString = (object, separator = '&') => Object.entries(object)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join(separator)

  unsubscribe.build = build.subscribe(({
    error,
    updated_at: updatedAt,
    app_id: applicationId,
    docker_image: dockerImage,
  }) => {
    if (error) {
      showError('No application found, go to the Git-repo of your runme button or go to the <a href="/">generator</a> page and create a new one.')
      header.isFailed(true, 'Error')
    } else {
      appId = applicationId // this need to be assigned, otherwise svelte wont detect the change
      header.showCountDown(updatedAt, 'Countdown', 600) // the app will be alive for 10 min (600s)
      header.setDockerImage(dockerImage)
      loadUrl(`https://${buildId}.runme.io`)
    }
  })

  unsubscribe.application = application.subscribe(({
    repo_branch: repoBranch,
    repo_url: repoUrl,
  }) => {
    if (repoBranch && repoUrl) {
      const queryParam = {
        repoUrl,
        repoBranch,
      }
      const queryString = toQueryString(queryParam)
      const deploymentUrl = DEPLOYMENT.host.trim()

      if (deploymentUrl) {
        header.setDeploymentUrl(`https://${deploymentUrl}/runme?${queryString}`)
      }
    }
  })

  onMount(() => {
    if (buildId) {
      build.get(buildId)
    } else {
      showError('No build_id has been given, please go to the <a href="/">generator</a> page and create a button and run url')
    }
  })

  onDestroy(() => {
    unsubscribe.build()
    unsubscribe.application()
    clearInterval(pollingInterval)
  })
</script>

<MetaData title="Showing your application"/>

<FixedHeader title="This application will stay available for 10 minutes."/>

{#if src && iframeLoaded && !errorMsg}
  <iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
{:else if !iframeLoaded && !errorMsg}
  <ContentLayout>
    <LoadingBlock>
      Your application is loading, please wait a couple of seconds...
    </LoadingBlock>
  </ContentLayout>
{:else if errorMsg}
  <ContentLayout>
    <h1>Oops</h1>
    <p>{@html errorMsg}</p>
  </ContentLayout>
{/if}

<style lang="sass">
  .deployed-iframe
    display: block
    border: none
    width: 100vw
    height: calc(100vh - 10rem)
</style>
