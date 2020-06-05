<script>
  export let title
</script>

<style lang="sass">
  @import "./assets/style/mixins"

  \:global(.tingle-modal-box__content)
    padding: 0

  h2
    background: $primary-color
    padding: 2rem 3rem
    margin: 0 0 2rem
    border-top-right-radius: .3rem
    border-top-left-radius: .3rem
    @include dashed-line(bottom)

    @media screen and (max-width: 600px)
      font-size: 2rem

  .modal-content
    padding: 1rem 3rem 3rem
    font-size: 1.4rem
</style>

{#if title}
  <h2>{title}</h2>
{/if}

<div class="modal-content">
  <slot/>
</div>
