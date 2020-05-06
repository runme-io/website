<script context="module">
    export async function preload () {
        const res = await this.fetch('data/docker-images.json')
        const dockerImages = await res.json()

        return { dockerImages }
    }
</script>

<script>
    import MainLayout from '../components/UI/Layout/MainLayout.svelte'
    import GenerateSpecTabGroup from '../components/Runme/GenerateSpecTabGroup.svelte'

    const title = 'Generate your spec'

    export let dockerImages
</script>

<MainLayout {title}>
    <div class="main-content">
        <h1>{title}</h1>

        <GenerateSpecTabGroup {dockerImages} />
    </div>
</MainLayout>
