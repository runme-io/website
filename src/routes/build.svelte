<script>
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
    import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
    import { default as AnsiUp } from 'ansi_up';
    import BuildLoading from '../components/UI/BuildLoading.svelte'
    import * as animateScroll from 'svelte-scrollto'
    import { goto } from '@sapper/app'
    import { runmeService } from '../components/Runme/Services'
    import { build } from '../components/Runme/Stores'
    import { queryParam } from '../components/Helpers/QueryParam'
    import Icon from 'fa-svelte'
    import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'
    import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown'
    import { isBase64 } from '../components/Helpers/Const'

    const ansi_up = new AnsiUp();

    let building = true
    let buildLog = ''
    let buildSticky = true
    let buildErrorMsg
    let countFrom = 0
    let displayActionsAsSticky = false

    const showBuildError = (error) => {
        buildErrorMsg = error
        building = false
    }

    const done = (buildId) => {
        goto(`/show?build_id=${buildId}`)
    }

    const scrollToBottom = () => {
        buildSticky = true
        // TODO somehow the offset (negative and positive) is not working).
        // TODO for now this is ok, but in a future release this should be fixed
        animateScroll.scrollTo({ element: '#marker-scroll-to-bottom', offset: 500 })
    }

    const scrollToTop = () => {
        buildSticky = false
        animateScroll.scrollToTop()
    }

    const getContentHeight = () => {
        if (process.browser) {
            const element = document.getElementsByClassName('content')
            return element[0] ? element[0].offsetHeight : 0
        }
    }

    const collectLog = (build_log, deploy_log) => {
        let log = []

        if (build_log) {
            if (isBase64(build_log)) {
                build_log = atob(build_log)
            }

            log.push(build_log)
        }

        if (deploy_log) {
            if (isBase64(deploy_log)) {
                deploy_log = atob(deploy_log)
            }

            log.push(deploy_log)
        }

        buildLog = ansi_up.ansi_to_html(log.join('\r\n')).replace(/[\r\n]/g, "<br />")
    }

    const process = (response) => {
        const { status, deploy_log, build_log, id } = response

        if (status === 'fail') {
            showBuildError(`Build failed`)
        }

        // TODO are we sure we need to do this automatically? e.g. Netlify does not do that
        if (status === 'done') {
            done(id)
        }

        // collect the log and combine them
        collectLog(build_log, deploy_log)

        // get the height of the content, to determine if we need to set an extra class for the sticky position
        displayActionsAsSticky = getContentHeight() > 300

        // If needed, we follow the log by scrolling to it
        if (buildSticky) {
            setTimeout(() => scrollToBottom(), 200)
        }
    }

    // only client code
    if (process.browser) {
        const buildId = queryParam().get('build_id')

        // no repo url? Redirect back
        if (buildId === '') {
            showBuildError('"build_id" is missing')
        } else {
            runmeService().build(buildId)
                .then(([response]) => {

                    // The Websockets does not return anything when the build failed or has been finished
                    // Therefore we need to process the data also on the first response
                    process(response)

                    // update the store
                    build.set(response)

                    // fire-up the WS
                    runmeService().wsBuild(buildId, message => process(message));
                })
                .catch(() => showBuildError(`Build ID "${buildId}" has not been found`))
        }
    }
</script>

<svelte:head>
    <title>Runme.io - Building your application</title>
</svelte:head>

<div class="page-container">
    <FixedHeader timerTitle="Build time" countUp="{true}" title="Run your application from any public Git-repo with one click"/>

    <div class="container">
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

                    {#if building && buildLog}
                        <div class="actions" class:sticky={displayActionsAsSticky}>
                            <button title="Scroll to bottom" class:active={buildSticky} on:click={scrollToBottom}><Icon icon="{faArrowDown}"/></button>
                            <button title="Scroll to top" on:click={scrollToTop}><Icon icon="{faArrowUp}"/></button>
                        </div>
                        <div id="marker-scroll-to-bottom"></div>
                    {/if}
                </div>
            </div>
        </main>
    </div>

    <JexiaFooter/>
</div>

<style lang="sass">
    @import '../assets/style/theme'

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
            position: relative

            .actions
                position: absolute
                bottom: 1.5rem
                right: 1.5rem
                text-align: right
                display: flex
                flex-direction: row
                margin-left: auto
                width: 7rem
                align-items: baseline
                background: #343434
                border-radius: 2rem
                padding: 1rem

                &.sticky
                    position: sticky

                > button
                    display: inline-flex
                    padding: 0 .5rem
                    cursor: pointer
                    border: 0
                    background: transparent
                    color: $white
                    outline: none

                    &.active
                        animation: flickerAnimation 1s infinite
</style>
