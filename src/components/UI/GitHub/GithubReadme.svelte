<script>
    import GitHubBookIcon from './GitHubBookIcon.svelte'
    import GithubMarkdown from './GithubMarkdown.svelte'
</script>

<div class="github-readme">
    <div class="header">
        <GitHubBookIcon/>
        <span>README.md</span>
    </div>
    <GithubMarkdown/>
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
</style>
