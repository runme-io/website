<script>
  import Header from './Header.svelte'
  import MainFooter from '../Footer/MainFooter.svelte'
  import SubFooter from '../Footer/SubFooter.svelte'
  import MetaData from '../MetaData.svelte'

  export let showTechnologyIcons = false
</script>

<MetaData  {...$$restProps}/>

<div class="page-container">
  <Header/>

  <main class="container">
    <slot/>
  </main>

  <SubFooter {showTechnologyIcons}/>

  <MainFooter/>
</div>
