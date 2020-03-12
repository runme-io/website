<script>
    import SimpleHeader from '../components/UI/SimpleHeader.svelte'
    import JexiaFooter from '../components/UI/JexiaFooter.svelte'

    const countDownFrom = 10 * 60
</script>
<svelte:head>
    <title>Runme.io - generate your code to deply</title>
</svelte:head>


<SimpleHeader countDown="{countDownFrom}" title="Run your application from any public Git-repo with one click"/>
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
            Build in progress....
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
</style>
