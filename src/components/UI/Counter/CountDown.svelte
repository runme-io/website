<script>
    import moment from 'moment'
    import { header } from '../../Stores/Header'
    import { displayTimer } from '../../../Helpers'
    import { onDestroy } from 'svelte'

    let display = '00:00'
    let totalSeconds = 0
    let interval = null

    const clear = () => {
        clearInterval(interval)
        display = '00:00'
    }

    const unsubscribe = header.subscribe(({ countDown, countDownFixed }) => {
        if (countDown) {
            const time = moment.utc(countDown)
            const now = moment()

            // Deal with an offset, se we can countdown from a date. The value of countDownFixed is the number of second to countdown
            // but also handle the current given time
            if (countDownFixed) {
                totalSeconds = countDownFixed - now.diff(time, 'seconds')
            } else {
                totalSeconds = time.diff(now, 'seconds')
            }

            // first clearing the old interval
            clearInterval(interval)

            // start the countdown
            interval = setInterval(() => {
                if (totalSeconds > 0) {
                  display = displayTimer(--totalSeconds)
                } else {
                  header.setCountDownFinish()
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
