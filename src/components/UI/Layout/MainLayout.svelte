<script>
    import RunmeFooter from './RunmeFooter.svelte'
    import JexiaFooter from './JexiaFooter.svelte'
    import Header from './Header.svelte'
    import TechnologyLogos from './TechnologyLogos.svelte'

    export let showRunmeFooter = true
    export let showTechnologyIcons = false
    export let title = ''

    const suffix = 'Runme.io'
    const pageTitle = title ? `${title} - ${suffix}` : suffix
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<div class="page-container">
    <Header/>

    <main>
        <div class="container">
            <slot/>
        </div>
    </main>

    {#if showTechnologyIcons}<TechnologyLogos/>{/if}
    {#if showRunmeFooter}<RunmeFooter/>{/if}
    <JexiaFooter/>
</div>
