<script>
  import { faCopy } from '@fortawesome/free-solid-svg-icons'
  import ButtonIcon from '../ButtonIcon.svelte'

  export let content = ''

  async function copy () {
    try {
      await navigator.clipboard.writeText(content)
    } catch (e) {
      console.error(e)
    }
  }
</script>

{content}
<ButtonIcon
  aria-label="copy"
  icon={faCopy}
  on:click={copy}
  tooltipOptions={{ content: 'Copy' }}
/>
