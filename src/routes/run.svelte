<script>
    import { goto } from '@sapper/app'
    import { runmeService } from '../components/Runme/Services'
    import { queryParam } from '../components/Helpers/QueryParam'
    import { redirectWithError } from '../components/Helpers/Const'

    const app_id = queryParam().get('app_id')

    if (process.browser) {
        if (app_id) {
            runmeService().start(app_id)
                .then(({ build_id, message }) => {

                    if (build_id) {
                        goto(`/build?build_id=${build_id}`)
                    }

                    if (message) {
                        redirectWithError(message)
                    }

                })
                .catch(() =>  redirectWithError(`No app has been found with ID "${app_id}". Please (re)generate a new button in order to run your application.`))
        } else {
            redirectWithError(`No "app_id" is given to run the application`)
        }
    }
</script>
