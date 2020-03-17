<script>
    import RunmeButton from '../../Runme/RunmeButton.svelte'
    import parseGithub from 'github-url-to-object'
    import { fetchReadme } from '@varandas/fetch-readme'
    import marked from 'marked'
    import { application } from '../../Runme/Stores'
    import { onDestroy } from 'svelte'
    import { getCurrentUrl } from '../../Helpers/Const'

    let content
    let runUrl

    const CurrentUrl = getCurrentUrl()

    const unsubscribe = application.subscribe(({ repo_url, id }) => {
        if (process.browser) {
            const github = parseGithub(repo_url)

            // fetch and parse the markdown
            fetchReadme({
                username: github.user,
                repository: github.repo,
                branch: github.branch
            }).then(response => content = marked(response))

            // set the run url to build the application
            runUrl = `${CurrentUrl}/run?app_id=${id}`
        }
    });

    onDestroy(unsubscribe)
</script>

<div class="markdown-body">
    <p><RunmeButton href={runUrl}/></p>
    {@html content}
</div>

<style lang="scss" global>
    @import "../../../../node_modules/@primer/css/markdown/index.scss";

    .markdown-body {
        padding: 4rem;

        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
    }
</style>
