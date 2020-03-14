<script>
    // Todo make this as a store
    let showTimer = 0

    let totalSeconds = 0;
    let hour = 0
    let minutes = 0
    let seconds = 0

    const countDownInterval = setInterval(function () {
        ++totalSeconds

        hour = Math.floor(totalSeconds /3600)
        minutes = Math.floor((totalSeconds - hour * 3600) / 60)
        seconds = totalSeconds - ((hour * 3600) + (minutes * 60));

        showTimer = minutes + ":" + seconds
    }, 1000)
</script>

{showTimer}
