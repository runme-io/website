<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style lang="sass">
    h1, p
        margin: 0 auto

    h1
        font-size: 2.8em
        font-weight: 700
        margin: 0 0 0.5em 0

    p
        margin: 1em auto


    @media (min-width: 480px)
        h1
            font-size: 4em

    pre
      background-color: #333
      border-radius: .5rem
      border: .1rem solid #ccc
      color: #fff
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
