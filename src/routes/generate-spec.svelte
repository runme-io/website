<script context="module">
    import DockerImages from '../components/Stores/DockerImages'
    export async function preload () {
        const res = await this.fetch('data/docker-images.json')
        const dockerImages = await res.json()

        DockerImages.set(dockerImages)
    }
</script>

<script>
    import MainLayout from '../components/UI/Layout/MainLayout.svelte'
    import GenerateSpecTabGroup from '../components/Runme/GenerateSpecTabGroup.svelte'

    const title = 'Generate your spec'
</script>

<MainLayout {title}>
    <div class="main-content">
        <h1>{title}</h1>

        <GenerateSpecTabGroup />
    </div>
</MainLayout>
