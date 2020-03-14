<script>
    import moment from 'moment'
    import { build } from '../../Runme/stores.js'
    import { displayTimer } from '../../Helpers/Const'

    let display = 0
    let totalSeconds = 0
    let interval = null

    setInterval(() => display = displayTimer(--totalSeconds), 1000)

    // TODO fix timers
    const unsubscribe = build.subscribe(({ updated_at }) => {
      console.log(interval)
        clearInterval(interval)
        display = '00:00'

        if (updated_at) {
            const deployedTime = moment.utc(updated_at)
            const now = moment()
            totalSeconds = now.diff(deployedTime, 'seconds')

            // update the timer
            interval = setInterval(() => display = displayTimer(--totalSeconds), 1000)
        }
    });
</script>

{display}
