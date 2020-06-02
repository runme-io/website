<script>
  import Copy from '../Copy.svelte'
  import ModalLayout from './ModalLayout.svelte'

  export let dockerImage = ''

  const commands = ['pull', 'start']
</script>

<style lang="sass">
  @import "./assets/style/mixins"

  ol
    margin-top: 2rem
    padding-left: 3rem
    counter-reset: item
    @include list-style-rounded-number(-3rem, .4rem, 2rem, 1.2rem)

    li
      margin: 1.5rem 0
      text-align: left

      &:first-child
        margin-top: .5rem

      &:last-child
        margin-bottom: .5rem
</style>

<ModalLayout title="Run your application locally">
  <p>Copy the following Docker commands to run your application locally.</p>
  <ol>
    {#each commands as command}
      <li><Copy isCodePiece={true} content={`docker ${command} ${dockerImage}`} /></li>
    {/each}
  </ol>
</ModalLayout>
