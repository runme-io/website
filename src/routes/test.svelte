<script>
    import { application } from '../components/Stores/Application'

    // const unsubscribe = application.subscribe(({ repo_name }) => repoName = repo_name)
    application.subscribe(res => console.log(res))

    application.get('50b2af51-f401-43fe-aaec-808868b7e3a0')
</script>
