<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<style lang="sass">
  @import './assets/style/theme'

  h1, p
    margin: 0 auto

  h1
    font-size: 2.8rem
    font-weight: 700
    margin: 0 0 .5rem 0

  p
    margin: 1rem auto


  @media (min-width: 480px)
    h1
      font-size: 4rem

  pre
    background-color: $gray-medium
    border-radius: .5rem
    border: .1rem solid $gray-light
    color: $white
    font-size: 1.4rem
    line-height: 1.4rem
    margin: 1rem 0
    word-break: break-all
    word-wrap: break-word
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
