<script>
    const logos = [
      'digital-ocean.png',
      'digital-ocean.png',
      'digital-ocean.png',
      'digital-ocean.png',
    ]
</script>

<div class="container">
    <section id="technology-logos">
        <p>Runme made possible through world impactful technologies</p>
        <div class="logos">
            {#each logos as logo}
                <div><img alt="logo" src="/images/technology/{logo}"></div>
            {/each}
        </div>
    </section>
</div>


<style lang="sass">
    @import '../../../assets/style/mixins'
    @import '../../../assets/style/theme'

    #technology-logos
        @include dashed-line(top)
        margin-top: calc(#{$spacing} * 2)
        padding-top: calc(#{$spacing} * 2)

        p
            text-align: center
            color: $gray

        .logos
            margin-top: 2rem
            display: flex
            flex-direction: row
            flex-wrap: wrap
            justify-content: center

            img
                width: 10rem
</style>
