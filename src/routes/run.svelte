<script>
    import { parse } from 'qs'
    import { goto } from '@sapper/app'
    import { runmeStart } from '../components/Runme/Service'

    // Run only in client mode
    if (process.browser) {
        const parsed = parse(window.location.search.replace('?', ''));

        // no app_id? just redirect back
        if (!Object.keys(parsed).includes('app_id')) {
            goto('/')
        }

        const { app_id } = parsed;

        runmeStart(app_id)
            .then(({ build_id, message }) => {

              if (build_id) {
                  goto(`/build?build_id=${build_id}`)
              }

              if (message) {
                // TODO show the error
                // goto(`/error?build_id=${build_id}`)
              }

            })
            .catch(() => {
              // TODO catch an error and show the message to the user
            })
    }
</script>
