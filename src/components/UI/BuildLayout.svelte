<script>
    import SimpleHeader from '../../components/UI/SimpleHeader.svelte'
    import JexiaFooter from './JexiaFooter.svelte'
</script>

<SimpleHeader/>
<main>
    <slot/>
</main>
<JexiaFooter/>


<style lang="sass">
    @import '../../assets/style/theme'

    main
        padding-left: $spacing
        padding-right: $spacing
</style>
