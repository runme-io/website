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
    const unsubscribe = {}

    let building = true
    let buildLog = ''
    let buildErrorMsg
    let countFrom = 0
    let workingOn = 'Build'
    let cliTitle = ''

    const showBuildError = (error) => {
        buildErrorMsg = error
        building = false
    }

    const done = (buildId) => {
        if (process.browser) {
            goto(`/show?build_id=${buildId}`)
        }
    }

    const collectLog = (build_log, deploy_log) => {
        let log = []

        if (build_log) {
            if (isBase64(build_log)) {
                build_log = atob(build_log)
            }

            log.push(build_log)
        }

        if (deploy_log) {
            workingOn = 'Deployment'

            if (isBase64(deploy_log)) {
                deploy_log = atob(deploy_log)
            }

            log.push(deploy_log)
        }

        buildLog = log.join('\r\n')
    }

    unsubscribe.application = application.subscribe(({ repo_branch, repo_name }) => {
        if (repo_name && repo_branch) {
            cliTitle = `${repo_name}:${repo_branch}`
        }
    })

    unsubscribe.build = build.subscribe(({ error, status, deploy_log, build_log, id, app_id, created_at }) => {
        if (error) {
            header.isFailed(true)
            showBuildError(error.message)
            return;
        }

        // fetch application info when the cliTitle has not been set with the repo info
        if (!cliTitle) {
            application.get(app_id)
        }

        // update the header values
        header.showCountUp(created_at, 'Build time')

        if (status === 'fail') {
            header.isFailed(true)
            showBuildError(`Build failed`)
        }

        if (status === 'done') {
            done(id)
        }

        // collect the log and combine them
        collectLog(build_log, deploy_log)
    })

    // no repo url? Redirect back
    if (buildId === '') {
        showBuildError('"build_id" is missing')
    } else {
        // start fetching the log
        build.get(buildId, true)
    }

    onDestroy(() => {
        unsubscribe.build()
        unsubscribe.application()
    })
</script>

<svelte:head>
    <title>Runme.io - Building your application</title>
</svelte:head>

<div class="page-container">
    <FixedHeader/>

    <div class="container">
        <main>
            <CliWindow {workingOn} working={building} error={buildErrorMsg} log={buildLog} title={cliTitle}/>
        </main>
    </div>

    <JexiaFooter/>
</div>
