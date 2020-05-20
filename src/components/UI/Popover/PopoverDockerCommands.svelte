<script>
  import Copy from '../Copy.svelte'

  export let dockerImage = ''

  const commands = ['pull', 'start']
</script>

<style lang="sass">
  ol
    list-style-type: decimal
    margin: 0
    padding: 0 1rem 0 3rem

    li
      margin: .5rem 0
      text-align: left
</style>

<ol>
  {#each commands as command}
    <li><Copy isCodePiece={true} content={`docker ${command} ${dockerImage}`} /></li>
  {/each}
</ol>

