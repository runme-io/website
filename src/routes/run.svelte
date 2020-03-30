<script>
    import { goto } from '@sapper/app'
    import { queryParam } from '../components/Helpers/QueryParam'
    import { redirectWithError } from '../components/Helpers/Const'
    import { onDestroy } from 'svelte'
    import { build } from '../components/Stores/Build'
    import { header } from '../components/Stores/Header'
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
    import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
    import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'

    let timeToRestart
    let showCountDown = false
    let showCountDownBlock = false
    let loading = true
    let errorMsg = ''
    let showDefaultErrorMsg = true

    const app_id = queryParam().get('app_id')

    const unsubHeader = header.subscribe(({ countDownFinish }) => {
      if (countDownFinish) {
          location.reload()
      }
    })

    const unsubBuild = build.subscribe(({ build_id, error }) => {
        if (error) {
            loading = false
            errorMsg = error.message

            if (error.nextBuild) {
                errorMsg = 'You are trying to run to many builds after each other. Please wait until we can run a new build for you'
                showDefaultErrorMsg = false
                header.showCountDown(error.nextBuild, 'Next build in')
            }
        } else if (error) {
            errorMsg = `No app has been found with ID "${app_id}". Please (re)generate a new button <a href="/">here</a> in order to run your application.`
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
    {:else if errorMsg}
        <h1>Error</h1>
        <p>
            {@html errorMsg}.
            {#if showDefaultErrorMsg}Please go back to the <a href="/">generator</a> page and create a button and run url.{/if}
        </p>

    {/if}
</ContentLayout>
