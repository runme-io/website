<script>
    import moment from 'moment'
    import { build } from '../../Runme/Stores'
    import { displayTimer } from '../../Helpers/Const'
    import { onDestroy } from 'svelte'

    let display = 0
    let totalSeconds = 0;
    let interval = null

    const unsubscribe = build.subscribe(({ created_at }) => {
        if (created_at) {
            const deployedTime = moment.utc(created_at)
            const now = moment()
            totalSeconds = now.diff(deployedTime, 'seconds')

            // first clearing the old interval
            clearInterval(interval)

            // start the countup
            interval = setInterval(() => display = displayTimer(++totalSeconds), 1000)
        } else {
            clearInterval(interval)
            display = '00:00'
        }
    });

    onDestroy(() => {
        clearInterval(interval)
        unsubscribe()
    })
</script>

{display}
