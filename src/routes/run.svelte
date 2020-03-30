<script>
    import { goto } from '@sapper/app'
    import { queryParam } from '../components/Helpers/QueryParam'
    import { redirectWithError } from '../components/Helpers/Const'
    import { onDestroy } from 'svelte'
    import { build } from '../components/Stores/Build'
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
    import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
    import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'

    let timeToRestart
    let showCountDown = false
    let showCountDownBlock = false


    const app_id = queryParam().get('app_id')

    const unsubscribe = build.subscribe(({ build_id, error }) => {
        if (build_id) {
            if (process.browser) {
                goto(`/build?build_id=${build_id}`)
            }
        } else if (error && error.message) {
            redirectWithError(error.message)
        } else if (error) {
            redirectWithError(`No app has been found with ID "${app_id}". Please (re)generate a new button in order to run your application.`)
        }
    })

    if (!app_id) {
        redirectWithError(`No "app_id" is given to run the application`)
    }

    // start the build
    build.start(app_id)

    onDestroy(unsubscribe)
</script>

<svelte:head>
    <title>Runme.io</title>
</svelte:head>

<FixedHeader title="This application will stay available for 10 minutes."/>

<ContentLayout>
    <LoadingBlock>
        You application is firing up, please hang with us so we can collect your repo info and start building your application.
    </LoadingBlock>
</ContentLayout>
