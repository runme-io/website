<script>
    import Icon from 'fa-svelte'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
    import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp'
    import GenerateButton from './GenerateButton.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import { isDockerUrl, isEmpty, isGitUrl } from '../Helpers/Validation'
    import Alert from '../UI/Alert.svelte'
    import GithubReadme from '../UI/GitHub/GithubReadme.svelte'
    import { runmeService } from './Services'
    import { queryParam } from '../Helpers/QueryParam'

    // form fields
    let embedStyle = 'markdown'
    let repoUrl = 'https://github.com/jexia/jexia-vue-todo.git' // TODO remove it later
    let repoBranch = 'master'
    let dockerImage = ''

    // others
    let showAdvancedOptions = false
    let embedCode = ''
    let dropDownIcon = faSortDown
    let canShowEmbed = false
    let loading = false
    let buttonText = 'Generate'
    let errorMsg = ''
    let appId = ''
    let errorType = 'warning'

    $: repoUrlValid = !isEmpty(repoUrl) && isGitUrl(repoUrl)
    $: dockerImageValid = isDockerUrl(dockerImage)
    $: formIsValid = repoUrlValid

    const CurrentUrl = process.browser ? `${location.protocol}//${location.host}` : ''

    const setError = (error, type = 'warning') => {
        errorType = type
        errorMsg = error
    }

    const clearError = () => {
        queryParam().set('error', '')
        setError('')
    }

    // check if we have to deal with an error from a previous page
    // TODO move this to a store/service or global component
    const hasError = queryParam().get('error')
    if (hasError) {
        setError(hasError, 'danger')
    }

    const isLoading = (status) => {
        if (status) {
            loading = true
            formIsValid = false
            buttonText = 'Generating...'
        } else {
            loading = false
            formIsValid = repoUrlValid
            buttonText = 'Generate'
        }
    }

    function toggleAdvanced () {
        showAdvancedOptions = !showAdvancedOptions
        dropDownIcon = showAdvancedOptions ? faSortDown : faSortUp
    }

    async function generateEmbedCode () {
        // set the button to loading
        isLoading(true)

        // clear previous errors
        clearError()

        try {
            let { id } = await runmeService().create(repoUrl, repoBranch, dockerImage)
            appId = id

            isLoading(false)
            showEmbedCode()

        } catch(error) {
            setError('There is a problem with creating your button. Please try again later')
            isLoading(false)
        }
    }

    function showEmbedCode () {
        canShowEmbed = repoUrl !== '' && repoBranch !== '' && appId !== ''
        if (canShowEmbed && embedStyle === 'markdown') {
            embedCode = `[![Runme](${CurrentUrl}static/button.svg)](https://runme.io/run?app_id=${appId})`
        } else if (canShowEmbed && embedStyle === 'reStructuredText') {
            embedCode = `.. image:: ${CurrentUrl}static/button.svg\n    :target: https://runme.io/run?app_id=${appId}`
        }
    }
</script>

<section class="generator">
    <!-- TODO move this to a global component for every page -->
    {#if errorMsg}<Alert type={errorType}>{errorMsg}</Alert>{/if}

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

    <GenerateButton {loading} disabled={!formIsValid} on:click={generateEmbedCode}>{buttonText}</GenerateButton>

    {#if canShowEmbed}
        <div class="embed-result">
            <div class="generated-embed-code">
                <div class="embed-code-options">
                    <label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="markdown"/> Markdown</label>
                    <label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="reStructuredText"/> reStructuredText</label>
                </div>
                <TextInput rows="4" controlType="textarea" value={embedCode}/>
            </div>

            <h3>Github example</h3>
            <GithubReadme/>
        </div>
    {/if}
</section>

<style lang="sass">
    @import '../../assets/style/theme'
    @import '../../assets/style/mixins'

    .generator
        padding-top: $spacing

    .spacing-top
        padding-top: 1rem

    .advanced-option
        font-size: 1.2rem
        cursor: pointer

    .advanced-option :global(.fa-svelte)
        width: 1rem

    .embed-result
        @include dashed-line(top)
        padding-top: 2rem
        margin-top: 2rem

        .generated-embed-code
            margin-top: 1rem

        .embed-code-options
            label
                cursor: pointer

        h3
            margin-top: 2rem
            font-weight: bold
            font-size: 2rem
            margin-bottom: 2rem
</style>
