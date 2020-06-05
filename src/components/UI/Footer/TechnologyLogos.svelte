<script>
  const logos = [
    {
      alt: 'digital-ocean',
      filename: 'digital-ocean.svg',
      height: '4rem',
    },
    {
      alt: 'docker',
      filename: 'docker.svg',
      height: '3rem',
    },
    {
      alt: 'Jexia',
      filename: 'jexia.svg',
      height: '3rem',
    },
    {
      alt: 'github',
      filename: 'github.svg',
      height: '3rem',
    },
    {
      alt: 'gitlab',
      filename: 'gitlab.svg',
      height: '4rem',
    },
    {
      alt: 'go',
      filename: 'go.svg',
      height: '3rem',
    },
    {
      alt: 'kubernetes',
      filename: 'kubernetes.svg',
      height: '4rem',
    },
    {
      alt: 'nodejs',
      filename: 'nodejs.svg',
      height: '4rem',
    },
    {
      alt: 'npm',
      filename: 'npm.svg',
      height: '2rem',
    },
    {
      alt: 'svelte',
      filename: 'svelte.svg',
      height: '4rem',
    },
  ]
</script>

<p>Runme made possible through world impactful technologies</p>
<div class="logos">
  {#each logos as logo}
    <img
      style="height:{logo.height}"
      title={logo.alt}
      alt={logo.alt}
      src="/images/technology/{logo.filename}"
    >
  {/each}
</div>

<style lang="sass">
  @import './assets/style/mixins'
  @import './assets/style/theme'

  p
    text-align: center
    color: $gray

  .logos
    display: grid
    grid-auto-flow: column
    grid-gap: 1rem
    margin-top: 2rem

    img
      align-self: center
</style>
