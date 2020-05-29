<script>
  export let title
</script>

<style lang="sass">
  @import "./assets/style/mixins"

  \:global(.tingle-modal-box__content)
    padding: 0

  h2
    background: $primary-color
    padding: 2rem
    margin: 0 0 2rem
    border-top-right-radius: .3rem
    border-top-left-radius: .3rem
    @include dashed-line(bottom)

  .modal-content
    padding: 2rem
</style>

{#if title}
  <h2>{title}</h2>
{/if}

<div class="modal-content">
  <slot/>
</div>
