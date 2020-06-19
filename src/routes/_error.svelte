<script>
  import MetaData from '../components/UI/MetaData.svelte'
  import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
  import Hotjar from '../components/UI/Tracking/Hotjar.svelte'
  import GoogleAnalytics from '../components/UI/Tracking/GoogleAnalytics.svelte'
  import { isDevelopment } from '../Consts'

  export let status
  export let error

  const dev = isDevelopment
  const title = `Oeps, that's a ${status}`
  const message = status === 404 ? 'Looks like the page you where looking for is no longer here.' : error.message
</script>

<style lang="sass">
  @import './assets/style/theme'

  @keyframes rotate
    0%
      transform: rotate(0)
      transform-origin: bottom left

    30%
      transform: rotate(130deg)
      transform-origin: bottom left

    60%
      transform: rotate(70deg)
      transform-origin: bottom left

    80%
      transform: rotate(100deg)
      transform-origin: bottom left

    100%
      transform: rotate(90deg)
      transform-origin: bottom left

  \:global(.logo-svg)
    animation: rotate 0.75s 1s both

  \:global(body)
    font-family: $font-family
    line-height: 1.5
    font-size: 1.6rem

  h1, p
    margin: 0 auto

  h1
    font-size: 2.8rem
    font-weight: 700
    margin: 0 0 .5rem 0
    text-align: center

  p
    margin: 1rem auto
    text-align: center


  @media (min-width: 480px)
    h1
      font-size: 4rem
      padding-top: $spacing-double

      &:before
        content: '#'

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

<GoogleAnalytics />
<Hotjar />

<MetaData {title}/>
<FixedHeader/>

<h1>{title}</h1>
<p>{message}</p>

{#if dev && error.stack}
  <pre>{error.stack}</pre>
{/if}
