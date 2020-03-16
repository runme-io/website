<script>
    import RunmeButton from './../../Runme/RunmeButton.svelte'
    import GitHubBookIcon from './GitHubBookIcon.svelte'
</script>

<div class="github-readme">
    <div class="header">
        <GitHubBookIcon/>
        <span>README.md</span>
    </div>
    <div class="content">
        <h1>Your awesome application</h1>
        <div class="runme-button"><RunmeButton/></div>
        <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae arcu tincidunt, vehicula nisi id, ullamcorper sem. Integer mollis, velit ut accumsan porttitor, tortor erat molestie lorem, ac placerat lacus arcu a mauris. Vivamus nulla velit, laoreet rutrum augue id, facilisis porta lorem. Aliquam interdum imperdiet fermentum. Ut turpis tellus, lacinia non tortor id, luctus rutrum tellus. Sed facilisis risus sed augue pulvinar, ut sagittis quam ullamcorper. Mauris dignissim feugiat sollicitudin.</p>
    </div>
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

        .content
            padding: 3.2rem

            h1
                padding-bottom: .3em
                border-bottom: 1px solid #eaecef
                font-size: 3rem
                font-weight: bold

            .runme-button
                margin-top: 2rem
                margin-bottom: 1rem

            p
                font-size: 1.6rem
                filter: blur(3px)
</style>
