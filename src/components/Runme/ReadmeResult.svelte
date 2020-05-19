<script>
  import { onMount, onDestroy } from 'svelte'
  import TextInput from '../UI/TextInput.svelte'
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
  .generated-embed-code
    margin-top: 1rem

  .embed-code-options
    label
      cursor: pointer
</style>

{#if embedCode}
  <div class="generated-embed-code">
    <TextInput
      readonly
      rows="4"
      controlType="textarea"
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
{/if}
