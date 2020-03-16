<script>
    import SimpleHeader from '../components/UI/Layout/SimpleHeader.svelte'
    import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
    import { default as AnsiUp } from 'ansi_up';
    import BuildLoading from '../components/UI/BuildLoading.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import { goto } from '@sapper/app'
    import { runmeService } from '../components/Runme/Services'
    import { build } from '../components/Runme/Stores'
    import { queryParam } from '../components/Helpers/QueryParam'

    const ansi_up = new AnsiUp();

    let building = true
    let buildLog = ''
    let buildErrorMsg
    let countFrom = 0

    const showBuildError = (error) => {
        buildErrorMsg = error
        building = false
    }

    const done = (buildId) => {
        goto(`/show?build_id=${buildId}`)
    }

    // only client code
    if (process.browser) {
        const buildId = queryParam().get('build_id')

        // no repo url? Redirect back
        if (buildId === '') {
            showBuildError('"build_id" is missing')
        } else {

            // TODO ASYNC/WAIT for the .build()
            runmeService().build(buildId)
                .then(([response]) => {
                    if (response.status === 'done') {
                        done(buildId)
                    }

                    // update the store
                    build.set(response)

                    // fire-up the WS
                    runmeService().wsBuild(buildId, message => {

                        const { status, deploy_log, build_log } = message
                        let log = []

                        if (status === 'fail') {
                            showBuildError(`Build failed`)
                        }

                        // TODO are we sure we need to do this automatically?
                        if (status === 'done') {
                            done(buildId)
                        }

                        if (build_log) {
                            log.push(build_log)
                        }

                        if (deploy_log) {
                            log.push(deploy_log)
                        }

                        buildLog = ansi_up.ansi_to_html(log.join('\r\n')).replace(/[\r\n]/g, "<br />")

                        // With a timeout, due the content change, we scroll to the bottom
                        // TODO use some kind of function for scrolling that Netlify also does (div scroll) instead of pageScroll
                        setTimeout(() => animateScroll.scrollToBottom({
                            offset: 200,
                        }), 200)
                    });
                })
                .catch(() => showBuildError(`Build ID "${buildId}" has not been found`))
        }
    }
</script>

<svelte:head>
    <title>Runme.io - Building your application</title>
</svelte:head>

<SimpleHeader timerTitle="Build time" countUp="{true}" title="Run your application from any public Git-repo with one click"/>

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
            {#if buildErrorMsg}<div class="not-found">> Error: {buildErrorMsg}</div>{/if}
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
