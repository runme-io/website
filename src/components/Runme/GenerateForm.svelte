<script>
    import { createEventDispatcher, onDestroy } from 'svelte'
    import Icon from 'fa-svelte'
    import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
    import RunmeButton from './RunmeButton.svelte'
    import OptionEnvVars from './Generator/OptionEnvVars.svelte'
    import GenerateButton from './Generator/GenerateButton.svelte'
    import { application } from '../Stores/Application'
    import TextInput from '../UI/TextInput.svelte'
    import Alert from '../UI/Alert.svelte'
    import { isEmpty, isGitUrl, queryParam, parseGitUrl, setUrl } from '../../Helpers'

    const dispatch = createEventDispatcher()

    // form fields
    let repoUrl = ''
    let repoUrlParsed = ''
    let repoBranch = 'master'
    let dockerImage = ''
    let envVars = {}

    // form states
    let repoUrlValid
    let repoBranchValid
    let dockerImageValid
    let formIsValid

    // others
    let showAdvancedOptions = false
    let loading = false
    let buttonText = 'Generate'
    let errorMsg = ''
    let appId = ''
    let errorType = 'warning'
    let envVarsValid = true // true by default as this is optional

    // ensure correct GIT url
    $: parseGitUrl(repoUrl).then(url => repoUrlParsed = url)

    // check if the fields are valid
    $: repoUrlValid = !isEmpty(repoUrlParsed) && isGitUrl(repoUrlParsed)
    $: repoBranchValid = repoBranch !== ''
    $: dockerImageValid = dockerImage === '' || isDockerUrl(dockerImage)
    $: formIsValid = repoUrlValid && dockerImageValid && envVarsValid

    $:dropDownIcon = showAdvancedOptions ? faSortUp : faSortDown

    const setError = (error, type = 'warning') => {
        errorType = type
        errorMsg = error
    }

    const clearError = () => {
        queryParam().clear('error')
        setError('')
    }

    // check if we have to deal with an error from a previous page
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
            dispatch('generate', appId)
        }
    })

    function toggleAdvanced () {
        showAdvancedOptions = !showAdvancedOptions
    }

    function createApp () {
        if (!formIsValid) { return }

        // set the button to loading
        isLoading(true)

        // clear previous errors
        clearError()

        // create an application and assign it to the store
        application.create(repoUrlParsed, repoBranch, dockerImage, envVars)
    }

    onDestroy(unsubscribe)
</script>

    <section class="repository-form">
        {#if errorMsg}<Alert type={errorType}>{errorMsg}</Alert>{/if}

        <div id="repo-url">
            <TextInput
                id="repo-url"
                label="Copy your repo URL below."
                valid={repoUrlValid}
                validityMessage="Please enter a valid Repository url."
                value={repoUrl}
                placeholder="https://github.com/jexia/test-node-app.git"
                on:enter={createApp}
                on:input={event => (repoUrl = event.target.value)}
            />
        </div>

        <div id="advanced-options">
            <div class="advanced-option" on:click={toggleAdvanced}>Advanced options <Icon icon={dropDownIcon}/></div>
            {#if showAdvancedOptions}
                <div class="spacing-top">
                    <TextInput
                        id="repo-branch"
                        label="Which branch should we use?"
                        valid={repoBranchValid}
                        validityMessage="Please enter a valid branch."
                        value={repoBranch}
                        placeholder="master"
                        on:input={event => (repoBranch = event.target.value)}
                    />
                    <TextInput
                        id="docker-image"
                        label="Copy your docker image in format <image>:<tag> (optional)"
                        valid={dockerImageValid}
                        validityMessage="Please enter a valid Docker image url."
                        value={dockerImage}
                        placeholder="<image>:<tag>"
                        on:enter={createApp}
                        on:input={event => (dockerImage = event.target.value)}
                    />
                    <OptionEnvVars
                        on:items={event => envVars = event.detail}
                        on:valid={event => envVarsValid = event.detail}
                    />
                </div>
            {/if}
        </div>

        <div class="generate-button">
            <GenerateButton {loading} disabled={!formIsValid} on:click={createApp}>{buttonText}</GenerateButton>
        </div>
    </section>

<style lang="sass">
    @import './assets/style/theme'
    @import './assets/style/mixins'

    .spacing-top
        padding-top: 2rem

    .advanced-option
        font-size: 1.2rem
        cursor: pointer

    .advanced-option :global(.fa-svelte)
        width: 1rem

    .generate-button
        text-align: center
</style>
