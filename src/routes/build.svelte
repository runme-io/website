<script>
  import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
  import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
  import { goto } from '@sapper/app'
  import { build } from '../components/Stores/Build'
  import { header } from '../components/Stores/Header'
  import { application } from '../components/Stores/Application'
  import { queryParam, isBase64 } from '../Helpers'
  import { onDestroy } from 'svelte'
  import CliWindow from '../components/UI/Cli/CliWindow.svelte'

  const buildId = queryParam().get('build_id')

  let building = true
  let logContent = ''
  let buildErrorMsg
  let workingOn = 'Build'
  let cliTitle = ''

  const showBuildError = (error) => {
    header.isFailed(true)
    buildErrorMsg = error
    building = false
  }

  const done = (buildId) => {
    if (process.browser) {
      goto(`/show?build_id=${buildId}`)
    }
  }

  const collectLog = (buildLog, deployLog) => {
    const log = []

    if (buildLog) {
      if (isBase64(buildLog)) {
        buildLog = atob(buildLog)
      }

      log.push(buildLog)
    }

    if (deployLog) {
      workingOn = 'Deployment'

      if (isBase64(deployLog)) {
        deployLog = atob(deployLog)
      }

      log.push(deployLog)
    }

    logContent = log.join('\r\n')
  }

  $: if (Object.keys($application).length) {
    const { repo_branch: repoBranch, repo_name: repoName } = $application
    cliTitle = `${repoName}:${repoBranch}`
  }

  const unsubscribe = build.subscribe(({
    error,
    status,
    deploy_log: deployLog,
    build_log: buildLog,
    id,
    app_id: appId,
    created_at: createdAt,
  }) => {
    if (error) {
      showBuildError(error.message)
      return
    }

    // fetch application info when the cliTitle has not been set with the repo info
    if (!cliTitle) {
      application.get(appId)
    }

    // update the header values
    header.showCountUp(createdAt, 'Build time')

    if (status === 'fail') {
      showBuildError('Build failed')
    }

    if (status === 'done') {
      done(id)
    }

    // collect the log and combine them
    collectLog(buildLog, deployLog)
  })

  // no repo url? Redirect back
  if (buildId === '') {
    showBuildError('"build_id" is missing')
  } else {
    // start fetching the log
    build.get(buildId, true)
  }

  onDestroy(unsubscribe)
</script>

<svelte:head>
  <title>Runme.io - Building your application</title>
</svelte:head>

<div class="page-container">
  <FixedHeader/>

  <div class="container">
    <main>
      <CliWindow {workingOn} working={building} error={buildErrorMsg} log={logContent} title={cliTitle}/>
    </main>
  </div>

  <JexiaFooter/>
</div>
