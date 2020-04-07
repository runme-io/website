<script>
    export let intervalTimer = 1000
    let dots = '';

    setInterval(() => {
        if (dots.length === 50) {
          dots = ''
        }
        dots += '.'
    }, intervalTimer)
</script>

<div class="build-progress">> Build in progress ...{dots}</div>

<style lang="sass">
    .build-progress
        margin-top: .5rem
</style>
