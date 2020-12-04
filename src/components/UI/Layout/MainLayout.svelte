<script>
  import Header from '../Header/Header.svelte'
  import MainFooter from '../Footer/MainFooter.svelte'
  import MetaData from '../MetaData.svelte'
</script>

<MetaData  {...$$restProps}/>

<div class="page-container">
  <Header/>

  <main class="container">
    <slot/>
  </main>

  <MainFooter/>
</div>
