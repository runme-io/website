<script>
    import moment from 'moment'
    import { build } from '../../Runme/stores.js'
    import { displayTimer } from '../../Helpers/Const'

    let display = 0
    let totalSeconds = 0;
    let interval = null

    const unsubscribe = build.subscribe(({ created_at }) => {
        if (created_at) {
            const deployedTime = moment.utc(created_at)
            const now = moment()
            totalSeconds = now.diff(deployedTime, 'seconds')

            // update the timer
            interval = setInterval(() => display = displayTimer(++totalSeconds), 1000)
        } else {
            clearInterval(interval)
            display = '00:00'
        }
    });
</script>

{display}
