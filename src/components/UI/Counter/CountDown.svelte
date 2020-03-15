<script>
    import moment from 'moment'
    import { build } from '../../Runme/stores.js'
    import { displayTimer } from '../../Helpers/Const'

    let display = 0
    let totalSeconds = 0
    let interval = null
    const appAliveInSeconds = 10 * 60

    const clear = () => {
        clearInterval(interval)
        display = '00:00'
    }

    const unsubscribe = build.subscribe(({ updated_at }) => {
        if (updated_at) {
            const deployedTime = moment.utc(updated_at)
            const now = moment()
            totalSeconds = appAliveInSeconds - now.diff(deployedTime, 'seconds')

            // update the timer
            interval = setInterval(() => {
                if(totalSeconds < 0) {
                  display = displayTimer(--totalSeconds)
                } else {
                  clear()
                }
            }, 1000)
        } else {
            clear()
        }
    });
</script>

{display}
