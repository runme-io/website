<script context="module">
  import Highlight from 'svelte-highlight'
  import { yaml, dockerfile, bash } from 'svelte-highlight/languages'
  import { githubGist } from 'svelte-highlight/styles'
</script>

<svelte:head>
  {@html githubGist}
</svelte:head>

<style lang="sass">
  @import "./assets/style/theme"

  div
    \:global(.hljs)
      padding: 0
      margin: 0
      overflow-x: unset

    \:global(.hljs code)
      display: inline-block
      margin: $code-block-margin
</style>

<script>
  const languages = { yaml, dockerfile, bash }
  export let lang
  export let code

  $: language = languages[lang]
</script>

<div>
  <Highlight {language}>{code}</Highlight>
</div>
