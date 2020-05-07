<script context="module">
    import Highlight from 'svelte-highlight'
    import { yaml, dockerfile, bash } from 'svelte-highlight/languages'
    import { githubGist } from 'svelte-highlight/styles'
</script>

<svelte:head>
  {@html githubGist}
</svelte:head>

<script>
    const languages = { yaml, dockerfile, bash }
    export let lang
    export let code

    $: language = languages[lang]
</script>

<Highlight {language}>{code}</Highlight>
