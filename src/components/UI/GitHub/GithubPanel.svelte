<script>
    import GitHubBookIcon from './GitHubBookIcon.svelte'

    export let displayIcon = true
</script>

<style lang="sass">
    @import './assets/style/theme'

    .github-panel
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

            > div
                display: inline-block
                margin-left: 1rem
</style>

<div class="github-panel">
    <div class="header">
        {#if displayIcon}
            <GitHubBookIcon/>
        {/if}
        <div>
            <slot name="title" />
        </div>
    </div>
    <slot />
</div>
