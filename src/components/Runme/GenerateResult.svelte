<script>
  import GenerateSpecResult from './GenerateSpecResult.svelte'
  import RunmeButton from './RunmeButton.svelte'
  import ReadmeResult from './ReadmeResult.svelte'
  import Button from '../UI/Button.svelte'
  import CodePiece from '../UI/CodePiece.svelte'
  import GithubReadme from '../UI/GitHub/GithubReadme.svelte'
  import { autoscroll } from '../Actions'
  import { SPEC_URL } from '../../Consts'

  export let scrollOptions = { enabled: true }
  export let isVisible = true
  export let spec
</script>

<style lang="sass">
  @import "./assets/style/theme"
  @import "./assets/style/mixins"

  $default-margin: 2rem

  .generate-result
    @include dashed-line(top)
    padding-top: $spacing
    margin-top: $spacing

    > h3
      font-weight: bold
      font-size: 2rem
      margin-bottom: $default-margin

  .result-list
    counter-reset: item
    $list-spacing: 4rem

    display: grid
    grid-gap: $default-margin
    margin-top: $default-margin
    padding-inline-start: $list-spacing

    li
      position: relative

      &:before
        align-items: center
        background-color: $primary-yellow
        border-radius: 50%
        counter-increment: item
        content: counter(item)
        color: $white
        display: flex
        justify-content: center
        left: -($list-spacing)
        padding: .1rem 1rem
        position: absolute
        text-align: center

  .dashed-section
    @include dashed-line(top)
    margin-top: 3rem
    padding-top: 3rem

</style>

{#if isVisible && spec}
  <div
    class="generate-result"
    use:autoscroll={scrollOptions}
  >
    <h3>Your <RunmeButton/> button is generated, we're almost there</h3>

    <ol class="result-list">
      <li>
        Copy the following { spec.dockerfile ? 'files' : 'file' } inside <CodePiece>./.runme</CodePiece> folder in the root of your repository.
        Curious about available options for <CodePiece>config.yaml</CodePiece>? <Button href={SPEC_URL} target="_blank">Read the full Runme Specification</Button> and change it by yourself.

        <GenerateSpecResult {spec} />
      </li>

      <li>
        Paste the following code in the <CodePiece>README.md</CodePiece> file of your repository

        <ReadmeResult />
      </li>
    </ol>

    <section class="dashed-section">
      <h3>This is how your README.md will look like with <RunmeButton/> button</h3>

      <GithubReadme />
    </section>
  </div>
{/if}
