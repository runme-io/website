<script>
  import { fade } from 'svelte/transition'
  import { faCopy, faFileDownload } from '@fortawesome/free-solid-svg-icons'
  import { ButtonIcon } from '../../UI/Button'
  import { DEFAULT_TRANSTION } from '../../../Consts'
  import { copyToClipboard } from '../../../Helpers'

  const MESSAGE_DELAY = 3000

  export let content
  export let filename
  export let label

  let linkElement
  let copied = false
  let copyMessageTimeout

  $: copyLabel = `Copy ${filename} content`
  $: downloadLabel = `Download ${filename}`

  function download () {
    const blob = new Blob([content], { type: 'application/octet-stream' })

    linkElement.href = window.URL.createObjectURL(blob)
    linkElement.target = '_blank'
    linkElement.download = filename

    setTimeout(() => window.URL.revokeObjectURL(linkElement.href), 100)
  }

  async function copyResult () {
    if (copyMessageTimeout) {
      clearTimeout(copyMessageTimeout)
    }
    const success = await copyToClipboard(content)
    if (success) {
      copied = true
      copyMessageTimeout = setTimeout(() => (copied = false), MESSAGE_DELAY)
    }
  }
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .header-title
    display: flex
    flex: 1
    justify-content: space-between

  .download-button
    text-decoration: none

  .button-container
    display: grid
    grid-gap: 1rem
    grid-template-columns: auto 1fr 1fr
    align-items: center

    span
      font-size: 1.2rem
      color: $success
      pointer-events: none
</style>

<div class="header-title">
  <a
    bind:this="{linkElement}"
    href="#/"
    on:click="{() => download()}"
    class="download-button"
    title="{downloadLabel}"
  >
    {label}
  </a>

  <div class="button-container">
    <div>
      {#if copied}
        <span transition:fade="{DEFAULT_TRANSTION}">File content copied!</span>
      {/if}
    </div>
    <ButtonIcon
      flex="{true}"
      aria-label="{copyLabel}"
      icon="{faCopy}"
      on:click="{copyResult}"
    />
    <ButtonIcon
      flex="{true}"
      aria-label="{downloadLabel}"
      icon="{faFileDownload}"
      on:click="{linkElement.click()}"
    />
  </div>
</div>
