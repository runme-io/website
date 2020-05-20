<script context="module">
  import DockerImages from '../components/Stores/DockerImages'
  export async function preload () {
    const res = await this.fetch('data/docker-images.json')
    const dockerImages = await res.json()

    DockerImages.set(dockerImages)
  }
</script>

<script>
  import RunmeButton from '../components/Runme/RunmeButton.svelte'
  import GenerateForm from '../components/Runme/GenerateForm.svelte'
  import GenerateResult from '../components/Runme/GenerateResult.svelte'
  import MainLayout from '../components/UI/Layout/MainLayout.svelte'
  import Link from '../components/UI/Link.svelte'
  import Button from '../components/UI/Button.svelte'
  import { generateSpec } from '../Helpers'

  let showRunmeFooter = false
  let spec

  async function generate ({ detail: success }) {
    showRunmeFooter = success
    spec = null // unassign before assign again, otherwise the component doesn't rerender new values
    spec = await generateSpec()
  }
</script>

<style lang="sass">
  @import "./assets/style/theme"

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
<Link class="test" href="http://google.nl" target="_blank">Read the full Runme Specification</Link>
<Link tooltipOptions={{ content: 'test' }} href="http://google.nl" target="_blank">Read the full Runme Specification</Link>
<Link asButton={true} href="http://google.nl" target="_blank">Read the full Runme Specification</Link>
<Button href="http://google.nl">Read the full Runme Specification</Button>
<MainLayout
  {showRunmeFooter}
  showTechnologyIcons={true}
  title="Run your application from any public Git-repo with one click"
>
  <div class="generator-page">
    <h1>Generate <RunmeButton/> button for your repo.</h1>
    <section class="generator">
      <GenerateForm on:generate={generate} />

      <GenerateResult
        isVisible={showRunmeFooter}
        {spec}
      />
    </section>
  </div>
</MainLayout>
