<script>
  import GitHubBookIcon from './GitHubBookIcon.svelte'

  export let displayIcon = true

  $: classes = $$restProps.class || ''
</script>

<style lang="sass">
  @import "./assets/style/theme"

  $github-border: .1rem solid #d1d5da

  .github-panel
    font-family: $font-family-github
    border: $github-border
    border-radius: .3rem
    margin-top: 2rem

    &-header
      display: flex
      flex-direction: row
      align-items: center
      padding: .8rem 1.6rem
      margin: -.1rem -.1rem 0
      background-color: #f6f8fa
      border: $github-border
      border-top-left-radius: .3rem
      border-top-right-radius: .3rem
      font-weight: 600

      > div
        display: flex
        flex: 1
        margin-left: 1rem

    &-content
      padding: 3rem

      \:global(pre)
        padding: 0
        margin: 0
</style>

<div class="github-panel {classes}">
  <div class="github-panel-header">
    {#if displayIcon}
      <GitHubBookIcon/>
    {/if}

    <div>
      <slot name="title" />
    </div>
  </div>

  <div class="github-panel-content">
    <slot />
  </div>
</div>
