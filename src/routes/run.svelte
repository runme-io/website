<script>
    import { goto } from '@sapper/app'
    import { queryParam } from '../components/Helpers/QueryParam'
    import { redirectWithError } from '../components/Helpers/Const'
    import { onDestroy } from 'svelte'
    import { build } from '../components/Stores/Build'

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
