<script>
  import GenerateSpecResult from './GenerateSpecResult.svelte'
  import RunmeButton from './RunmeButton.svelte'
  import ReadmeResult from './ReadmeResult.svelte'
  import GithubReadme from '../UI/GitHub/GithubReadme.svelte'

  export let isVisible = true
  export let spec

  function autoscroll (nodeElement) {
    setTimeout(
      () => nodeElement.scrollIntoView({ behavior: 'smooth' }),
      200,
    )
  }
</script>

<style lang="sass">
  @import "./assets/style/theme"
  @import "./assets/style/mixins"

  .generate-result
    @include dashed-line(top)
    padding-top: $spacing
    margin-top: $spacing

    > h3
      font-weight: bold
      font-size: 2rem
      margin-bottom: 2rem

  .regular-section
    margin-top: 2rem

  .dashed-section
    @include dashed-line(top)
    margin-top: 3rem
    padding-top: 3rem
</style>

{#if isVisible}
  <div
    class="generate-result"
    use:autoscroll
  >
    <h3>Your <RunmeButton/> button is generated, we're almost there</h3>

    <section class="regular-section">
      <GenerateSpecResult {spec} />
    </section>

    <section class="regular-section">
      <ReadmeResult />
    </section>

    <section class="dashed-section">
      <h3>This is how your README.md will look like with <RunmeButton/> button</h3>

      <GithubReadme />
    </section>
  </div>
{/if}
