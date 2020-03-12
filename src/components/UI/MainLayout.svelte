<script>
    import Footer from '../../components/UI/Footer.svelte'
    import Header from '../../components/UI/Header.svelte'
</script>

<Header/>
<main>
    <slot/>
</main>
<Footer/>


<style lang="sass">
    @import '../../assets/style/theme'

    main
        padding-left: $spacing
        padding-right: $spacing
</style>
