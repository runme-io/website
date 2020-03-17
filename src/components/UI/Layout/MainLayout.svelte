<script>
    import Header from './Header.svelte'
    import RunmeFooter from './RunmeFooter.svelte'
    import JexiaFooter from './JexiaFooter.svelte'
    import { embedCodeGenerated } from './../../Runme/Stores'
</script>

<Header/>

<main>
    <slot/>
</main>

{#if $embedCodeGenerated}<RunmeFooter/>{/if}

<JexiaFooter/>
