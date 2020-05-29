<script>
  import Header from './Header.svelte'
  import MainFooter from '../Footer/MainFooter.svelte'
  import SubFooter from '../Footer/SubFooter.svelte'

  export let title = ''
  export let showTechnologyIcons = false

  const suffix = 'Runme.io'
  const pageTitle = title ? `${title} - ${suffix}` : suffix
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="page-container">
  <Header/>

  <main class="container">
    <slot/>
  </main>

  <SubFooter {showTechnologyIcons}/>
  <MainFooter/>
</div>
