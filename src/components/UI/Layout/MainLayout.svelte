<script>
    import Header from './Header.svelte'
    import RunmeFooter from './RunmeFooter.svelte'
    import JexiaFooter from './JexiaFooter.svelte'
</script>

<Header/>
<main>
    <slot/>
</main>
<RunmeFooter/>
<JexiaFooter/>


<style lang="sass">
    @import '../../assets/style/theme'

    main
        padding-left: $spacing
        padding-right: $spacing
</style>
