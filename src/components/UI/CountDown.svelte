<script>
    // Todo make this as a store
    export let countDown = null
    let showTimer = 0

    let timer = countDown
    let minutes
    let seconds

    const countDownInterval = setInterval(function () {
        minutes = Math.floor(timer / 60)
        seconds = Math.floor(timer % 60)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        showTimer = minutes + ":" + seconds

        --timer

        if (timer < 0) {
            clearInterval(countDownInterval)
        }
    }, 1000)
</script>

{showTimer}
