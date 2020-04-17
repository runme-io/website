<script>
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
    import { application } from '../components/Stores/Application'
    import { build } from '../components/Stores/Build'
    import { header } from '../components/Stores/Header'
    import { queryParam } from '../components/Helpers/QueryParam'
    import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
    import { onDestroy } from 'svelte'
    import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'
    import { DEPLOYMENT } from '../env'

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

    const showError = (msg) => {
        errorMsg = msg
        clearInterval(pollingInterval)
    }

    const urlExists = async (url) => {
        if (!process.browser) { return }

        const response = await fetch(url)
        if (response.status > 400) {
            throw 'Failed to fetch'
        }
    }

    const loadUrl = (url) => {
        if (!process.browser) { return }

        clearInterval(pollingInterval) // clear previous interval
        pollingAttempt = 1 // reset value

        pollingInterval = setInterval(async () => {
            try {
                await urlExists(url)
                application.get(appId)
                src = url
                iframeLoaded = true
            } catch (e) {
                if (pollingAttempt++ > maxPollingAttempt) {
                    showError('Your application cannot be loaded.')
                }
            }
        }, intervalTimer)
    }

    const toQueryString = (object, separator = '&') =>
            Object.entries(object).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join(separator)

    unsubscribe.build = build.subscribe(({ error, updated_at, app_id }) => {
        if (error) {
            showError(`No application found, go to the Git-repo of your runme button or go to the <a href="/">generator</a> page and create a new one.`)
            header.isFailed(true, 'Error')
        } else {
            appId = app_id
            header.showCountDown(updated_at, 'Countdown', 600) // the app will be alive for 10 min (600s)
            loadUrl(`https://${buildId}.runme.io`)
        }
    })

    unsubscribe.application = application.subscribe(({ repo_branch, repo_url, env_variables }) => {
        if (repo_branch && repo_url) {
            const queryParam = {
                repo_url,
                repo_branch,
                env_vars: env_variables
                        ? toQueryString(env_variables, ',')
                        : null,
            }
            const queryString = toQueryString(queryParam)

            header.setDeploymentUrl(`https://${DEPLOYMENT.host}/runme?${queryString}`)
        }
    })

    if (process.browser) {
        if (buildId) {
            build.get(buildId)
        } else {
            showError('No build_id has been given, please go to the <a href="/">generator</a> page and create a button and run url')
        }
    }

    onDestroy(() => {
        unsubscribe.build()
        unsubscribe.application()
        clearInterval(pollingInterval)
    })
</script>

<svelte:head>
    <title>Runme.io</title>
</svelte:head>

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
        <h1>Error</h1>
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
