<script>
  import RunmeButton from '../components/Runme/RunmeButton.svelte'
  import GenerateForm from '../components/Runme/GenerateForm.svelte'
  import ReadmeResult from '../components/Runme/ReadmeResult.svelte'
  import MainLayout from '../components/UI/Layout/MainLayout.svelte'

  let showRunmeFooter = false
</script>

<style lang="sass">
  @import '../assets/style/theme'
  @import '../assets/style/mixins'

  .generator-page
    padding-top: 6rem
    width: 75%
    margin: 0 auto

    @media screen and (max-width: 800px)
      width: 100%

    h1
      text-align: center
      font-size: 2.5rem

  .generator
    padding-top: $spacing
</style>

<MainLayout {showRunmeFooter} showTechnologyIcons={true} title="Run your application from any public Git-repo with one click">
  <div class="generator-page">
    <h1>Generate <RunmeButton/>  button for your repo.</h1>
    <section class="generator">
      <GenerateForm on:generate={() => (showRunmeFooter = true)} />

      <ReadmeResult />
    </section>
  </div>
</MainLayout>
