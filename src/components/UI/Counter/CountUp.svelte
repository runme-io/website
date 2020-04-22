<script>
    import moment from 'moment'
    import { header } from '../../Stores/Header'
    import { displayTimer } from '../../../Helpers'
    import { onDestroy } from 'svelte'

    let display = '00:00'
    let totalSeconds = 0;
    let interval = null
    let countUpCheckValue

    const clear = () => {
        clearInterval(interval)
        display = '00:00'
    }

    const unsubscribe = header.subscribe(({ countUp }) => {
        if (countUp) {
            if (countUp !== countUpCheckValue) {
                countUpCheckValue = countUp //check value

                const deployedTime = moment.utc(countUp)
                const now = moment()
                totalSeconds = now.diff(deployedTime, 'seconds')

                // first clearing the old interval
                clearInterval(interval)

                // start the counter
                interval = setInterval(() => display = displayTimer(++totalSeconds), 1000)
            }
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
