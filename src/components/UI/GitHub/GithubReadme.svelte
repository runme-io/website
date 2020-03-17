<script>
    // import RunmeButton from './../../Runme/RunmeButton.svelte'
    import GitHubBookIcon from './GitHubBookIcon.svelte'
    import parseGithub from 'github-url-to-object'
    import { fetchReadme } from '@varandas/fetch-readme'
    import marked from 'marked'
    import GithubMarkdown from './GithubMarkdown.svelte'

    export let repositoryUrl

    let readme

    const github = parseGithub(repositoryUrl)

    if (process.browser) {

        // const converter = new showdown.Converter()
        fetchReadme({
            username: github.user,
            repository: github.repo,
            branch: github.branch
        }).then(response => readme = marked(response))
    }

    // const result = await axiosInstance.get(
    //         config.username +
    //         '/' +
    //         config.repository +
    //         '/' +
    //         config.branch +
    //         '/' +
    //         config.readme
    // )
    // return result.data
</script>

<div class="github-readme">
    <div class="header">
        <GitHubBookIcon/>
        <span>README.md</span>
    </div>
    <GithubMarkdown content={readme}/>
</div>

<style lang="sass">
    @import '../../../assets/style/theme'

    .github-readme
        font-family: $font-family-github
        border: .1rem solid #d1d5da
        border-radius: .3rem
        margin-top: 2rem

        .header
            display: flex
            flex-direction: row
            align-items: center
            padding: .8rem 1.6rem
            margin: -.1rem -.1rem 0
            background-color: #f6f8fa
            border: 1px solid #d1d5da
            border-top-left-radius: .3rem
            border-top-right-radius: .3rem
            font-weight: 600

            span
                display: inline-block
                margin-left: 1rem

        .markdown-body
            padding: 3.2rem

            /*.runme-button*/
            /*    margin-top: 2rem*/
            /*    margin-bottom: 1rem*/
</style>
