<script>
    const logos = [
        {
            alt: 'Jexia',
            filename: 'jexia.svg',
            height: '3rem'
        },
        {
            alt: 'digital-ocean',
            filename: 'digital-ocean.svg',
            height: '4rem'
        },
        {
            alt: 'docker',
            filename: 'docker.svg',
            height: '3rem'
        },
        {
            alt: 'github',
            filename: 'github.svg',
            height: '3rem'
        },
        {
            alt: 'gitlab',
            filename: 'gitlab.svg',
            height: '4rem'
        },
        {
            alt: 'go',
            filename: 'go.svg',
            height: '3rem'
        },
        {
            alt: 'kubernetes',
            filename: 'kubernetes.svg',
            height: '4rem'
        },
        {
            alt: 'nodejs',
            filename: 'nodejs.svg',
            height: '4rem'
        },
        {
            alt: 'npm',
            filename: 'npm.svg',
            height: '2rem'
        },
        {
            alt: 'svelte',
            filename: 'svelte.svg',
            height: '4rem'
        },
    ]
</script>

<div class="container">
    <section id="technology-logos">
        <p>Runme made possible through world impactful technologies</p>
        <div class="logos">
            {#each logos as logo}
                <div><img style="height:{logo.height}" title={logo.alt} alt={logo.alt} src="/images/technology/{logo.filename}"></div>
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
            align-items: center

            div
                padding: 0 1.5rem 1rem
</style>
