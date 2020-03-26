<script>
    import Icon from 'fa-svelte'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
    import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp'
    import GenerateButton from './GenerateButton.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import { isDockerUrl, isEmpty, isGitUrl } from '../Helpers/Validation'
    import Alert from '../UI/Alert.svelte'
    import GithubReadme from '../UI/GitHub/GithubReadme.svelte'
    import { queryParam } from '../Helpers/QueryParam'
    import { application } from '../Stores/Application'
    import RunmeButton from './RunmeButton.svelte'
    import { setUrl } from '../Helpers/Const'
    import { onDestroy } from 'svelte'
    import OptionEnvVars from './OptionEnvVars.svelte'

    // form fields
    let embedStyle = 'markdown'
    let repoUrl = ''
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
    $: dockerImageValid = dockerImage === '' || isDockerUrl(dockerImage)
    $: formIsValid = repoUrlValid && dockerImageValid

    const setError = (error, type = 'warning') => {
        errorType = type
        errorMsg = error
    }

    const clearError = () => {
        queryParam().clear('error')
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

    const unsubscribe = application.subscribe(({ id, error }) => {
        if (error) {
            console.log(error)
            setError('There is a problem with creating your button. Please try again later')
            isLoading(false)
        }

        if (id) {
            appId = id
            isLoading(false)
            showEmbedCode()
        }
    })

    function toggleAdvanced () {
        showAdvancedOptions = !showAdvancedOptions
        dropDownIcon = showAdvancedOptions ? faSortDown : faSortUp
    }

    function generateEmbedCode () {
        // set the button to loading
        isLoading(true)

        // clear previous errors
        clearError()

        // create an application and assign it to the store
        application.create(repoUrl, repoBranch, dockerImage)
    }

    function showEmbedCode () {
        // Global statement: we need this var evaluation also in our template
        canShowEmbed = repoUrl !== '' && repoBranch !== '' && appId !== ''

        const runUrl = setUrl(`run?app_id=${appId}`)

        if (canShowEmbed && embedStyle === 'markdown') {
            embedCode = `[![Runme](https://svc.runme.io/static/button.svg)](${runUrl})`
        } else if (canShowEmbed && embedStyle === 'reStructuredText') {
            embedCode = `.. image:: https://svc.runme.io/static/button.svg\n    :target: ${runUrl}`
        }
    }

    onDestroy(unsubscribe)
</script>

<section class="generator">
    {#if errorMsg}<Alert type={errorType}>{errorMsg}</Alert>{/if}

    <div id="repo-url">
        <TextInput
            id="repo-url"
            label="Copy your repo URL below. (URL format http://<repo URL>.git)"
            valid={repoUrlValid}
            validityMessage="Please enter a valid Repository url."
            value={repoUrl}
            placeholder="https://github.com/jexia/test-node-app.git"
            on:enter={generateEmbedCode}
            on:input={event => (repoUrl = event.target.value)} />
    </div>

    <div id="advanced-options">
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
                    on:enter={generateEmbedCode}
                    on:input={event => (dockerImage = event.target.value)} />

                <OptionEnvVars />
            </div>
        {/if}
    </div>

    <div class="generate-button">
        <GenerateButton {loading} disabled={!formIsValid} on:click={generateEmbedCode}>{buttonText}</GenerateButton>
    </div>

    {#if canShowEmbed}
        <div class="embed-result">
            <div class="generated-embed-code">
                <TextInput rows="4" controlType="textarea" label="Include this code in the Readme.md file of your GitHub repo, to make your repo runnable" value={embedCode}/>
                <div class="embed-code-options">
                    <label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="markdown"/> Markdown</label>
                    <label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="reStructuredText"/> reStructuredText</label>
                </div>
            </div>

            <h3>Your Readme.md (with <RunmeButton/> button)</h3>
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
        padding-top: 2rem

    .advanced-option
        font-size: 1.2rem
        cursor: pointer

    .advanced-option :global(.fa-svelte)
        width: 1rem

    .generate-button
        text-align: center

    .embed-result
        @include dashed-line(top)
        padding-top: 4rem
        margin-top: 3rem

        .generated-embed-code
            margin-top: 1rem

        .embed-code-options
            label
                cursor: pointer

        h3
            margin-top: 4rem
            font-weight: bold
            font-size: 2rem
            margin-bottom: 2rem
</style>
