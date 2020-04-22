<script>
    import { goto } from '@sapper/app'
    import { queryParam, redirectWithError } from '../Helpers'
    import { onDestroy } from 'svelte'
    import { build } from '../components/Stores/Build'
    import { header } from '../components/Stores/Header'
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
    import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
    import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'
    import CountDown from '../components/UI/Counter/CountDown.svelte'

    let timeToRestart
    let showCountDown = false
    let showCountDownBlock = false
    let loading = true
    let hasError = false
    let generalError = false
    let rateLimitError = false
    let showDefaultErrorMsg = true

    $: hasError = generalError || rateLimitError

    const app_id = queryParam().get('app_id')

    const unsubHeader = header.subscribe(({ countDownFinish }) => {
        if (countDownFinish) {
            location.reload()
        }
    })

    const unsubBuild = build.subscribe(({ build_id, error }) => {
        if (error && error.nextBuild) {
            loading = false
            rateLimitError = true
            showDefaultErrorMsg = false
            header.showCountDown(error.nextBuild, 'Next build in')
        } else if (error) {
            loading = false
            generalError = true

        } else if (build_id) {
            if (process.browser) {
                goto(`/build?build_id=${build_id}`)
            }
        }
    })

    if (!app_id) {
        redirectWithError(`No "app_id" is given to run the application`)
    }

    // start the build
    build.start(app_id)

    onDestroy(() => {
        unsubBuild()
        unsubHeader()
    })
</script>

<svelte:head>
    <title>Runme.io</title>
</svelte:head>

<FixedHeader/>

<ContentLayout>
    {#if loading}
        <LoadingBlock>
            You application is firing up, please hang with us so we can collect your repo info and start building your application.
        </LoadingBlock>
    {:else if hasError}
        <h1>Oeps!</h1>
        <p>
            {#if rateLimitError}
                There are to many build triggers for this particular repo. Please hang on, Runme will try to run it in a new build, after <CountDown /> minutes.
            {/if}

            {#if generalError}
                No app has been found with ID "{app_id}. Please <a href="/">(re)generate a new button</a> in order to run your application.
            {/if}

            {#if showDefaultErrorMsg}Please go back to the <a href="/">generator</a> page and create a button and run url.{/if}
        </p>

    {/if}
</ContentLayout>
