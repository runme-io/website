<script>
    import MainLayout from '../components/UI/Layout/MainLayout.svelte'
    import GenerateSpecTabGroup from '../components/Runme/GenerateSpecTabGroup.svelte'

    const title = 'Generate your spec'

    function generateSpec () {

    }
</script>

<MainLayout {title}>
    <div class="main-content">
        <h1>{title}</h1>

        <GenerateSpecTabGroup />
    </div>
</MainLayout>
