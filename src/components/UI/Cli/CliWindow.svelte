<script>
    import CliLoading from './CliLoading.svelte'
    import PerfectScrollbar from 'perfect-scrollbar'
    import { afterUpdate, onMount } from 'svelte'
    import { default as AnsiUp } from 'ansi_up'

    export let log = ''
    export let error
    export let working = false
    export let workingOn = 'Build'

    const ansi_up = new AnsiUp()
    let formattedLog = ''
    let loadingPrefix = ''
    let ps = null
    let stickyToBottom = true
    let psContainer = null

    $: formattedLog = ansi_up.ansi_to_html(log).replace(/[\r\n]/g, "<br />")

    // Append errors to the log
    $: if (error) {
      log = `${log}\r\n> Error: ${error}`
    }

    $: loadingPrefix = `${workingOn} in progress`

    onMount(() => {
        ps = new PerfectScrollbar('#perfectScrollbar', {
            wheelPropagation: false
        })
        psContainer = document.querySelector('#perfectScrollbar')

        // check if we need to stick to the bottom
        psContainer.addEventListener('ps-scroll-up', () => stickyToBottom = false)
        psContainer.addEventListener('ps-y-reach-end', () => stickyToBottom = true)
    })

    afterUpdate(() => {
        ps.update()
        if (stickyToBottom) {
            scrollToBottom()
        }
    })

    const scrollToTop = () => {
        stickyToBottom = false
        psContainer.scrollTop = 0
    }

    const scrollToBottom = () => {
        if (process.browser) {
            psContainer.scrollTop = ps.contentHeight
            stickyToBottom = true
        }
    }
</script>

<div class="build-log">
    <header>
        <ul class="actions">
            <li class="red"></li>
            <li class="orange"></li>
            <li class="green"></li>
        </ul>
        <h2>Jexia CLI</h2>
    </header>
    <div id="perfectScrollbar" class="content ps">
        <div class="log">{@html formattedLog}</div>
        {#if working}<CliLoading prefix={loadingPrefix} intervalTimer="100"/>{/if}
    </div>
</div>

<style lang="sass">
    @import '../../../assets/style/theme'

    @keyframes flickerAnimation
        0%
            opacity: 1
        50%
            opacity: .2
        100%
            opacity: 1

    .build-log
        margin-top: $spacing
        background-color: #1d1d1d
        border-radius: .5rem

        header
            border-top-left-radius: .5rem
            border-top-right-radius: .5rem
            background-color: #343434
            padding: .5rem 2rem
            display: flex
            flex-direction: row
            align-items: baseline

            h2
                text-align: center
                color: $white
                font-size: 1.4rem
                padding: 0
                margin: 0
                flex-grow: 1

            .actions
                display: inline-block

                li
                    display: inline-block
                    width: 1rem
                    height: 1rem
                    border-radius: 50%

                    &.green
                        background-color: #2dc660

                    &.orange
                        background-color: #fbba60

                    &.red
                        background-color: #f95e63

        .content
            color: $white
            padding: 3rem 2rem
            word-break: break-word
            line-height: 2.5rem
            position: relative
            min-height: calc(100vh - 25rem)
            height: calc(100vh - 25rem)
</style>
