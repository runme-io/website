<script>
    import moment from 'moment'
    import { header } from '../../Stores/Header'
    import { displayTimer } from '../../Helpers/Const'
    import { onDestroy } from 'svelte'

    let display = '00:00'
    let totalSeconds = 0
    let interval = null
    const appAliveInSeconds = 10 * 60 // 10min

    const clear = () => {
        clearInterval(interval)
        display = '00:00'
    }

    const unsubscribe = header.subscribe(({ countDown }) => {
        if (countDown) {
            const deployedTime = moment.utc(countDown)
            const now = moment()
            totalSeconds = appAliveInSeconds - now.diff(deployedTime, 'seconds')

            // first clearing the old interval
            clearInterval(interval)

            // start the countdown
            interval = setInterval(() => {
                if (totalSeconds > 0) {
                  display = displayTimer(--totalSeconds)
                } else {
                  clear()
                }
            }, 1000)
        } else {
            clear()
        }
    });

    onDestroy(() => {
        clear()
        unsubscribe()
    })
</script>

{display}
