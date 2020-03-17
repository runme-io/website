<script>
    import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
</script>

<svelte:head>
    <!-- TODO show the repo url in the title? -->
    <title>Runme.io - </title>
</svelte:head>

<FixedHeader title="Deploy your application on our Jexia platform"/>

<iframe class="deployed-iframe" title="Your deployed app" src="https://app.jexia.com"></iframe>

<style lang="sass">
    @import '../assets/style/theme'

    .deployed-iframe
        display: block
        background: #000
        border: none
        width: 100vw
        height: calc(100vh - 10rem)
</style>
