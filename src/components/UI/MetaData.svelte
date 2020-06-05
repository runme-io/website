<script>
  export let title = 'Run your applications from Git-repo with one click'
  export let description = 'Runme.io let\'s you generate a Button which you can integrate in to your Git-repo, and run application from your Git-repo with one click.'
  export let image = ''
  export let imageAlt = ''
  export let url = ''
  export let type = ''
  export let twitterCard = ''

  // append a suffix
  const fullTitle = `${title} - Runme.io`
</script>

<svelte:head>
  {#if fullTitle}
    <title>{fullTitle}</title>
    <meta name="title" content={fullTitle}/>
    <meta property="og:title" content={fullTitle}/>
    <meta property="twitter:title" content={fullTitle}/>
  {/if}

  {#if description}
    <meta name="description" content={description}/>
    <meta property="og:description" content={description}/>
    <meta property="twitter:description" content={description}/>
  {/if}

  {#if image}
    <meta property="og:image" content={image}/>
    <meta property="twitter:image" content={image}/>
  {/if}

  {#if imageAlt}
    <meta property="og:image:alt" content={imageAlt}/>
    <meta property="twitter:image:alt" content={imageAlt}/>
  {/if}

  {#if url}
    <meta property="og:url" content={url}/>
    <meta property="twitter:url" content={url}/>
  {/if}

  {#if type}
    <meta property="og:type" content={type}/>
  {/if}

  <meta property="twitter:card" content={twitterCard || 'summary_large_image'}/>
</svelte:head>
