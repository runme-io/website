<script>
  import { onMount, onDestroy } from 'svelte'
  import RunmeButton from './RunmeButton.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import GithubReadme from '../UI/GitHub/GithubReadme.svelte'
  import { setUrl } from '../../Helpers'
  import { application } from '../Stores/Application'

  const runmeButtonUrl = setUrl('/static/button.svg')
  const markdown = 'Markdown'
  const embedStyles = [
    markdown,
    'reStructuredText',
  ]

  let embedStyle = markdown
  let runUrl
  let appSubscription = () => {}

  $: code = embedStyle === markdown
    ? `[![Runme](${runmeButtonUrl})](${runUrl})`
    : `.. image:: ${runmeButtonUrl}\n    :target: ${runUrl}`
  $: embedCode = runUrl ? code : ''

  function init (nodeElement) {
    setTimeout(
      () => nodeElement.scrollIntoView({ behavior: 'smooth' }),
      200,
    )
  }

  onMount(() => {
    appSubscription = application.subscribe(({ error, id }) => {
      if (error) {
        runUrl = null // clear result when error is thrown
        return
      }

      if (id) {
        runUrl = setUrl(`run?app_id=${id}`)
      }
    })
  })

  onDestroy(appSubscription)
</script>

<style lang="sass">
  @import "./assets/style/mixins"

  .embed-result
    @include dashed-line(top)
    padding-top: 4rem
    margin-top: 3rem

    .generated-embed-code
      margin-top: 1rem

    .embed-code-options
      label
        cursor: pointer

    > h3
      margin-top: 4rem
      font-weight: bold
      font-size: 2rem
      margin-bottom: 2rem
</style>

{#if embedCode}
  <div
    class="embed-result"
    use:init
  >
    <div class="generated-embed-code">
      <TextInput
        rows="4"
        controlType="textarea"
        label="Include this code in the README.md file of your GitHub repo, to make your repo runnable"
        value={embedCode}
      />
      <div class="embed-code-options">
        {#each embedStyles as style}
          <label>
            <input
              bind:group={embedStyle}
              type="radio"
              value={style}
            /> {style}
          </label>
        {/each}
      </div>
    </div>

    <h3>Your README.md (with <RunmeButton/> button)</h3>
    <GithubReadme/>
  </div>
{/if}
