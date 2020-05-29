<script>
  import { faCopy } from '@fortawesome/free-solid-svg-icons'
  import ButtonIcon from './ButtonIcon.svelte'
  import CodePiece from './CodePiece.svelte'
  import { CopyToClipboard } from '../../Helpers'

  export let content = ''
  export let isCodePiece = false

  const COPY_LABEL_DEFAULT = 'copy'
  const COPY_LABEL_COPIED = 'copied!'

  let tooltipCopyLabel = COPY_LABEL_DEFAULT

  async function copyText () {
    const success = await CopyToClipboard(content)
    if (success) {
      tooltipCopyLabel = COPY_LABEL_COPIED
    }
  }
</script>

<style lang="sass">
  .copy
    position: relative
    padding-right: 1rem

    \:global(.copy-icon)
      position: absolute
      margin-left: .3rem
      width: 1rem
      font-size: 1rem
</style>

<div class="copy">
  {#if isCodePiece}
   <CodePiece>{content}</CodePiece>
  {:else}
    {content}
  {/if}

  <ButtonIcon
    class="copy-icon"
    aria-label="copy"
    icon={faCopy}
    on:click={copyText}
    tooltipOptions={{ content: tooltipCopyLabel, hideOnClick: false, onHide: () => (tooltipCopyLabel = COPY_LABEL_DEFAULT) }}
  />
</div>
