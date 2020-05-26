<script>
  import Copy from '../Copy.svelte'

  export let dockerImage = ''

  const commands = ['pull', 'start']
</script>

<style lang="sass">
  @import "./assets/style/mixins"

  ol
    font-size: 1.2rem
    margin: 0
    padding-left: 3rem
    counter-reset: item
    @include list-style-rounded-number(-3rem, -.2rem, 2rem)

    li
      margin: 1.5rem 0
      text-align: left

      &:first-child
        margin-top: .5rem

      &:last-child
        margin-bottom: .5rem
</style>

<ol>
  {#each commands as command}
    <li><Copy isCodePiece={true} content={`docker ${command} ${dockerImage}`} /></li>
  {/each}
</ol>

