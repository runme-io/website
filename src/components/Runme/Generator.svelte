<script>
    import Icon from 'fa-svelte'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
    import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp'
    import GenerateButton from './GenerateButton.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import { isDockerUrl, isEmpty, isGitUrl } from '../Helpers/Validation'
    import RunmeButton from './RunmeButton.svelte'
    import GitHubBookIcon from './GitHubBookIcon.svelte'

    let showAdvancedOptions = false
    let embedStyle = 'markdown'
    let repoUrl = 'https://github.com/jexia-com/WebApp.git' // TODO remove it later
    let repoBranch = 'master' // TODO remove it later
    let dockerImage = ''
    let embedCode = ''
    let dropDownIcon = faSortDown
    let canShowEmbed = false

    $: repoUrlValid = !isEmpty(repoUrl) && isGitUrl(repoUrl)
    $: dockerImageValid = isDockerUrl(dockerImage)

    function toggleAdvanced () {
        showAdvancedOptions = !showAdvancedOptions
        dropDownIcon = showAdvancedOptions ? faSortDown : faSortUp
    }

    function generateEmbedCode () {
        canShowEmbed = repoUrl !== '' && repoBranch !== ''
        if (canShowEmbed && embedStyle === 'markdown') {
            embedCode = `[![Runme](https://runme.io/static/button.svg)](https://runme.io/runme?repo_url=${repoUrl}&repo_branch=${repoBranch}&docker_image=${dockerImage}`
        } else if (canShowEmbed && embedStyle === 'reStructuredText') {
            embedCode = `.. image:: https://runme.io/static/button.svg\n    :target: https://runme.io/runme?repo_url=repo_url=${repoUrl}&repo_branch=${repoBranch}&docker_image=${dockerImage}`
        }
    }

    // change the code based on the embedStyle selection
    $: generateEmbedCode(embedStyle)

</script>

<style lang="sass">
    @import '../../assets/style/theme'

    .generator
        padding-top: $spacing

    .spacing-top
        padding-top: 1rem

    .advanced-option
        font-size: 1.2rem
        cursor: pointer

    .advanced-option :global(.fa-svelte)
        width: 1rem

    .generated-embed-code
        margin-top: 2rem

    .embed-code-options
        label
            cursor: pointer

    .github-readme
        font-family: $font-family-github
        border: .1rem solid #d1d5da
        border-radius: .3rem
        margin-top: $spacing

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


</style>

<section class="generator">
    <div class="generator__repo-url">
        <TextInput
            id="repo-url"
            label="Copy your repo URL below. (URL format http://<repo URL>.git)"
            valid={repoUrlValid}
            validityMessage="Please enter a valid Repository url."
            value={repoUrl}
            placeholder="https://github.com/jexia/test-node-app.git"
            on:input={event => (repoUrl = event.target.value)} />
    </div>

    <div class="generator__advanced-options">
        <div class="advanced-option" on:click={toggleAdvanced}>Advanced options <Icon icon={dropDownIcon}/></div>
        {#if showAdvancedOptions}
            <div class="spacing-top">
                <TextInput
                    id="title"
                    label="Copy your docker image in format <image>:<tag> (optional)"
                    valid={dockerImageValid}
                    validityMessage="Please enter a valid Docker image url."
                    value={dockerImage}
                    placeholder="<image>:<tag>"
                    on:input={event => (dockerImage = event.target.value)} />
            </div>
        {/if}
    </div>

    <GenerateButton on:click={generateEmbedCode}>Generate</GenerateButton>

    {#if canShowEmbed}
        <div class="generated-embed-code">
            <div class="embed-code-options">
                <label><input bind:group={embedStyle} type="radio" value="markdown"/> Markdown</label>
                <label><input bind:group={embedStyle} type="radio" value="reStructuredText"/> reStructuredText</label>
            </div>
            <TextInput rows="4" controlType="textarea" value={embedCode}/>
        </div>

        <div class="github-readme">
            <div class="header">
                <GitHubBookIcon/>
                <span>README.md</span>
            </div>
            <div class="content">
                <h1>Application</h1>
                <div class="runme-button"><RunmeButton/></div>
                <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae arcu tincidunt, vehicula nisi id, ullamcorper sem. Integer mollis, velit ut accumsan porttitor, tortor erat molestie lorem, ac placerat lacus arcu a mauris. Vivamus nulla velit, laoreet rutrum augue id, facilisis porta lorem. Aliquam interdum imperdiet fermentum. Ut turpis tellus, lacinia non tortor id, luctus rutrum tellus. Sed facilisis risus sed augue pulvinar, ut sagittis quam ullamcorper. Mauris dignissim feugiat sollicitudin.</p>
            </div>
        </div>
    {/if}
</section>
