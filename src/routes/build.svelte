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
    import Icon from 'fa-svelte'
    import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp'
    import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown'

    const ansi_up = new AnsiUp();

    let building = true
    let buildLog = ''
    let buildSticky = true
    let buildErrorMsg
    let countFrom = 0

    const showBuildError = (error) => {
        buildErrorMsg = error
        building = false
    }

    const done = (buildId) => {
        goto(`/show?build_id=${buildId}`)
    }

    const scrollToBottom = () => {
        buildSticky = true
        animateScroll.scrollTo({ element: '#scroll-to-bottom' })
    }

    const scrollToTop = () => {
        buildSticky = false
        animateScroll.scrollToTop()
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
                        //done(buildId)
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

                        // TODO are we sure we need to do this automatically? e.g. Netlify does not do that
                        if (status === 'done') {
                            //done(buildId)
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
                        setTimeout(() => scrollToBottom, 200)
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

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor faucibus fringilla. Ut nec egestas sapien. Pellentesque faucibus nisi molestie lectus interdum cursus. Donec sit amet est non neque consectetur bibendum. Proin vitae sem nec eros porttitor malesuada. Vivamus sagittis malesuada leo vel dapibus. Sed ac faucibus erat. Nam tempor nibh ac auctor condimentum. Aliquam rutrum euismod condimentum. Duis vitae cursus mauris. In vel magna luctus, hendrerit augue et, rhoncus metus. Ut in urna turpis. Nulla ac accumsan elit. Nunc quis mattis justo, gravida viverra massa.

            Suspendisse potenti. Pellentesque lacinia odio tellus, quis cursus arcu feugiat in. Cras congue, neque a pharetra pellentesque, elit nibh tincidunt lacus, vitae sodales sapien nisi non augue. Praesent posuere odio in sem eleifend mattis. Nam quis ipsum lacus. Praesent eget ultricies urna. Phasellus laoreet quam ut justo luctus, auctor pharetra neque facilisis. Aenean hendrerit molestie orci eget pulvinar. Mauris vestibulum efficitur diam, quis faucibus mauris auctor et. Ut scelerisque odio eu enim malesuada, non sagittis quam finibus. Morbi molestie feugiat enim vitae porta.

            Integer faucibus est odio, quis viverra purus viverra nec. Proin dolor neque, placerat sit amet interdum nec, iaculis vitae nisi. Nullam tortor nunc, facilisis in commodo quis, venenatis et dui. Morbi ultrices dolor sed purus bibendum, at convallis magna sodales. Donec auctor sagittis sapien, non molestie ligula consequat a. Integer consectetur lectus in sem venenatis posuere. Aliquam ac consectetur tellus. Cras tincidunt lobortis justo quis venenatis. Donec fermentum erat eget dui varius interdum. Vestibulum et aliquet tortor, eget vehicula diam. Nam a euismod nunc.

            Nam vitae tempus quam. Integer sed consequat sem. Donec lectus risus, sagittis vel mollis a, suscipit sed est. Mauris euismod tincidunt ligula, et lobortis dolor viverra eget. Praesent tincidunt vitae tellus consectetur congue. Donec eget ipsum fermentum, lacinia mi in, consequat erat. Vivamus malesuada tortor lacus, a auctor tellus tempor et. Duis mauris tortor, imperdiet vel aliquam ut, convallis vel elit. Aliquam ex diam, finibus non tempor vitae, lacinia non lacus.

            Donec ornare diam vel mauris euismod commodo. Pellentesque cursus molestie urna, sed tincidunt lacus imperdiet vitae. Sed eu elementum orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In consectetur dapibus sem a vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed semper pharetra cursus. Etiam justo mi, sagittis sit amet neque at, volutpat fermentum enim. Phasellus pulvinar erat in sem hendrerit, sed imperdiet justo volutpat. Nullam ut lorem in lacus pellentesque congue. Integer mattis venenatis lorem, in fringilla mi ullamcorper eget. In nec porta dui, sed bibendum elit. Curabitur convallis dictum venenatis. Fusce lacinia ex id lacus semper cursus.

            Etiam eget velit condimentum, faucibus odio eget, pellentesque tellus. Nullam a sodales nunc. In imperdiet lorem id metus tempor, nec vestibulum enim convallis. Praesent ultricies sed mauris at interdum. Vivamus viverra sed nisi sed vulputate. Maecenas lacus odio, blandit eget arcu id, vehicula blandit nisl. Suspendisse orci felis, sollicitudin eget metus at, facilisis sollicitudin nulla. Cras in magna ultrices, volutpat elit sit amet, rhoncus nulla. Nunc a n

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor faucibus fringilla. Ut nec egestas sapien. Pellentesque faucibus nisi molestie lectus interdum cursus. Donec sit amet est non neque consectetur bibendum. Proin vitae sem nec eros porttitor malesuada. Vivamus sagittis malesuada leo vel dapibus. Sed ac faucibus erat. Nam tempor nibh ac auctor condimentum. Aliquam rutrum euismod condimentum. Duis vitae cursus mauris. In vel magna luctus, hendrerit augue et, rhoncus metus. Ut in urna turpis. Nulla ac accumsan elit. Nunc quis mattis justo, gravida viverra massa.

            Suspendisse potenti. Pellentesque lacinia odio tellus, quis cursus arcu feugiat in. Cras congue, neque a pharetra pellentesque, elit nibh tincidunt lacus, vitae sodales sapien nisi non augue. Praesent posuere odio in sem eleifend mattis. Nam quis ipsum lacus. Praesent eget ultricies urna. Phasellus laoreet quam ut justo luctus, auctor pharetra neque facilisis. Aenean hendrerit molestie orci eget pulvinar. Mauris vestibulum efficitur diam, quis faucibus mauris auctor et. Ut scelerisque odio eu enim malesuada, non sagittis quam finibus. Morbi molestie feugiat enim vitae porta.

            Integer faucibus est odio, quis viverra purus viverra nec. Proin dolor neque, placerat sit amet interdum nec, iaculis vitae nisi. Nullam tortor nunc, facilisis in commodo quis, venenatis et dui. Morbi ultrices dolor sed purus bibendum, at convallis magna sodales. Donec auctor sagittis sapien, non molestie ligula consequat a. Integer consectetur lectus in sem venenatis posuere. Aliquam ac consectetur tellus. Cras tincidunt lobortis justo quis venenatis. Donec fermentum erat eget dui varius interdum. Vestibulum et aliquet tortor, eget vehicula diam. Nam a euismod nunc.

            Nam vitae tempus quam. Integer sed consequat sem. Donec lectus risus, sagittis vel mollis a, suscipit sed est. Mauris euismod tincidunt ligula, et lobortis dolor viverra eget. Praesent tincidunt vitae tellus consectetur congue. Donec eget ipsum fermentum, lacinia mi in, consequat erat. Vivamus malesuada tortor lacus, a auctor tellus tempor et. Duis mauris tortor, imperdiet vel aliquam ut, convallis vel elit. Aliquam ex diam, finibus non tempor vitae, lacinia non lacus.

            Donec ornare diam vel mauris euismod commodo. Pellentesque cursus molestie urna, sed tincidunt lacus imperdiet vitae. Sed eu elementum orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In consectetur dapibus sem a vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed semper pharetra cursus. Etiam justo mi, sagittis sit amet neque at, volutpat fermentum enim. Phasellus pulvinar erat in sem hendrerit, sed imperdiet justo volutpat. Nullam ut lorem in lacus pellentesque congue. Integer mattis venenatis lorem, in fringilla mi ullamcorper eget. In nec porta dui, sed bibendum elit. Curabitur convallis dictum venenatis. Fusce lacinia ex id lacus semper cursus.

            Etiam eget velit condimentum, faucibus odio eget, pellentesque tellus. Nullam a sodales nunc. In imperdiet lorem id metus tempor, nec vestibulum enim convallis. Praesent ultricies sed mauris at interdum. Vivamus viverra sed nisi sed vulputate. Maecenas lacus odio, blandit eget arcu id, vehicula blandit nisl. Suspendisse orci felis, sollicitudin eget metus at, facilisis sollicitudin nulla. Cras in magna ultrices, volutpat elit sit amet, rhoncus nulla. Nunc a n

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor faucibus fringilla. Ut nec egestas sapien. Pellentesque faucibus nisi molestie lectus interdum cursus. Donec sit amet est non neque consectetur bibendum. Proin vitae sem nec eros porttitor malesuada. Vivamus sagittis malesuada leo vel dapibus. Sed ac faucibus erat. Nam tempor nibh ac auctor condimentum. Aliquam rutrum euismod condimentum. Duis vitae cursus mauris. In vel magna luctus, hendrerit augue et, rhoncus metus. Ut in urna turpis. Nulla ac accumsan elit. Nunc quis mattis justo, gravida viverra massa.

            Suspendisse potenti. Pellentesque lacinia odio tellus, quis cursus arcu feugiat in. Cras congue, neque a pharetra pellentesque, elit nibh tincidunt lacus, vitae sodales sapien nisi non augue. Praesent posuere odio in sem eleifend mattis. Nam quis ipsum lacus. Praesent eget ultricies urna. Phasellus laoreet quam ut justo luctus, auctor pharetra neque facilisis. Aenean hendrerit molestie orci eget pulvinar. Mauris vestibulum efficitur diam, quis faucibus mauris auctor et. Ut scelerisque odio eu enim malesuada, non sagittis quam finibus. Morbi molestie feugiat enim vitae porta.

            Integer faucibus est odio, quis viverra purus viverra nec. Proin dolor neque, placerat sit amet interdum nec, iaculis vitae nisi. Nullam tortor nunc, facilisis in commodo quis, venenatis et dui. Morbi ultrices dolor sed purus bibendum, at convallis magna sodales. Donec auctor sagittis sapien, non molestie ligula consequat a. Integer consectetur lectus in sem venenatis posuere. Aliquam ac consectetur tellus. Cras tincidunt lobortis justo quis venenatis. Donec fermentum erat eget dui varius interdum. Vestibulum et aliquet tortor, eget vehicula diam. Nam a euismod nunc.

            Nam vitae tempus quam. Integer sed consequat sem. Donec lectus risus, sagittis vel mollis a, suscipit sed est. Mauris euismod tincidunt ligula, et lobortis dolor viverra eget. Praesent tincidunt vitae tellus consectetur congue. Donec eget ipsum fermentum, lacinia mi in, consequat erat. Vivamus malesuada tortor lacus, a auctor tellus tempor et. Duis mauris tortor, imperdiet vel aliquam ut, convallis vel elit. Aliquam ex diam, finibus non tempor vitae, lacinia non lacus.

            Donec ornare diam vel mauris euismod commodo. Pellentesque cursus molestie urna, sed tincidunt lacus imperdiet vitae. Sed eu elementum orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In consectetur dapibus sem a vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed semper pharetra cursus. Etiam justo mi, sagittis sit amet neque at, volutpat fermentum enim. Phasellus pulvinar erat in sem hendrerit, sed imperdiet justo volutpat. Nullam ut lorem in lacus pellentesque congue. Integer mattis venenatis lorem, in fringilla mi ullamcorper eget. In nec porta dui, sed bibendum elit. Curabitur convallis dictum venenatis. Fusce lacinia ex id lacus semper cursus.

            Etiam eget velit condimentum, faucibus odio eget, pellentesque tellus. Nullam a sodales nunc. In imperdiet lorem id metus tempor, nec vestibulum enim convallis. Praesent ultricies sed mauris at interdum. Vivamus viverra sed nisi sed vulputate. Maecenas lacus odio, blandit eget arcu id, vehicula blandit nisl. Suspendisse orci felis, sollicitudin eget metus at, facilisis sollicitudin nulla. Cras in magna ultrices, volutpat elit sit amet, rhoncus nulla. Nunc a n

            {@html buildLog}
            {#if building}<BuildLoading intervalTimer="100"/>{/if}
            {#if buildErrorMsg}<div class="not-found">> Error: {buildErrorMsg}</div>{/if}

            <ul class="actions">
                <li on:click={scrollToBottom}><Icon icon="{faArrowDown}"/></li>
                <li on:click={scrollToTop}><Icon icon="{faArrowUp}"/></li>
            </ul>
            <div id="scroll-to-bottom"></div>
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
            position: relative

            .actions
                position: sticky
                bottom: .5rem
                text-align: right
                display: inline-block
                float: right
                background: #343434
                border-radius: 2rem
                padding: 1rem 2rem

                li

                    display: inline-block
</style>
