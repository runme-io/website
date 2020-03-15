<script>
    import SimpleHeader from '../components/UI/Layout/SimpleHeader.svelte'
    import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
    import { parse } from 'qs'
    import { default as AnsiUp } from 'ansi_up';
    import BuildLoading from '../components/UI/BuildLoading.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import { goto } from '@sapper/app'
    import { runmeBuild } from '../components/Runme/Service'
    import { build } from '../components/Runme/stores.js';

    const ansi_up = new AnsiUp();

    let building = true
    let buildLog = ''
    let buildStatus = 'building'
    let buildNotFound = false
    let countFrom = 0

    // only client code
    if (process.browser) {
        const parsed = parse(window.location.search.replace('?', ''))

        // no repo url? Redirect back
        if (!Object.keys(parsed).includes('build_id')) {
            goto('/')
        }

        const { build_id } = parsed

        function process(once = false) {
            runmeBuild(build_id)
                .then((response) => {
                    if (response.length === 0) {
                        buildNotFound = true
                        building = false
                        clearInterval(poll)
                    }

                    if (response[0] !== undefined) {
                        const { status, deploy_log, build_log } = response[0]
                        let log = []

                        // update the start date for the counter
                        if (once) {
                            build.set(response[0])
                        }

                        // fail? show a message
                        if (status === 'fail') {
                            building = false
                            clearInterval(poll)
                        }

                        // success? Go to the show page
                        if (status === 'done') {
                            building = false
                            clearInterval(poll)
                            goto(`/show?build_id=${build_id}`)
                        }

                        if(build_log) {
                            log.push(atob(build_log))
                        }

                        if(deploy_log) {
                            log.push(atob(deploy_log))
                        }

                        buildLog = ansi_up.ansi_to_html(log.join('\r\n')).replace(/[\r\n]/g, "<br />")
                        buildStatus = status

                        // With a timeout, due the content change, we scroll to the bottom
                        setTimeout(() => animateScroll.scrollToBottom({
                            offset: 200,
                        }), 200)
                    }
                });
        }

        process(true)

        const poll = setInterval(() => process(), 3000);

    }
</script>
<svelte:head>
    <title>Runme.io - generate your code to deply</title>
</svelte:head>

<SimpleHeader countDownTitle="Build time" countUp="{true}" title="Run your application from any public Git-repo with one click"/>

<main>
    <div class="build-log">
        <header>
            <ul class="actions">
                <li class="red"></li>
                <li class="orange"></li>
                <li class="green"></li>
            </ul>
            <h2>Jexia CLI</h2>
        </header>
        <div class="content">
            {@html buildLog}
            {#if building}<BuildLoading intervalTimer="100"/>{/if}
            {#if buildStatus === 'fail'}<div class="failed">Build failed</div>{/if}
            {#if buildNotFound}<div class="not-found">Build not found</div>{/if}
        </div>
    </div>
</main>

<JexiaFooter/>

<style lang="sass">
    @import '../assets/style/theme'

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
                font-size: 1.2rem
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
            min-height: 30rem
            word-break: break-word
            line-height: 2.5rem
</style>
