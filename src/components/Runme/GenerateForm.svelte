<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import GenerateButton from './Generator/GenerateButton.svelte'
  import GenerateSpecTabGroup from './GenerateSpecTabGroup.svelte'
  import { application } from '../Stores/Application'
  import TextInput from '../UI/TextInput.svelte'
  import Alert from '../UI/Alert.svelte'
  import { isEmpty, isGitUrl, queryParam, parseGitUrl } from '../../Helpers'

  const dispatch = createEventDispatcher()

  // form fields
  let repoUrl = ''
  let repoUrlParsed = ''
  let repoBranch = 'master'

  // form states
  let repoUrlValid
  let isSpecValid

  // others
  let loading = false
  let buttonText = 'Generate'
  let error = null
  let appInfo
  let errorType = 'warning'

  // ensure correct GIT url
  $: parseGitUrl(repoUrl).then(url => (repoUrlParsed = url))

  // check if the fields are valid
  $: repoUrlValid = !isEmpty(repoUrlParsed) && isGitUrl(repoUrlParsed)
  $: isFormValid = repoUrlValid && isSpecValid
  $: isGenerateDisabled = loading || !isFormValid
  $: appInfoChanged = appInfo && (
    appInfo.repo_url !== repoUrlParsed
    || (!repoBranch && appInfo.repo_branch !== 'master')
    || (repoBranch && appInfo.repo_branch !== repoBranch)
  )
  $: canCreateApp = !appInfo || appInfoChanged

  const setError = (message, type = 'warning') => {
    errorType = type
    error = {
      title: 'There is a problem with creating your button',
      message,
    }
  }

  const clearError = () => {
    queryParam().clear('error')
    error = null
  }

  // check if we have to deal with an error from a previous page
  const hasError = queryParam().get('error')
  if (hasError) {
    setError(hasError, 'danger')
  }

  const isLoading = (status) => {
    if (status) {
      loading = true
      buttonText = 'Generating...'
    } else {
      loading = false
      buttonText = 'Generate'
    }
  }

  // eslint-disable-next-line camelcase
  const unsubscribe = application.subscribe(({ id, repo_branch, repo_url, error }) => {
    isLoading(false)

    if (error) {
      console.log('error', error)
      setError(error.message)
    }

    if (id) {
      appInfo = { id, repo_branch, repo_url }
    }

    dispatch('generate', !!id)
  })

  function createApp () {
    if (!isFormValid || loading) { return }

    // clear previous errors
    clearError()

    if (canCreateApp) {
      // set the button to loading
      isLoading(true)
      // create an application and assign it to the store
      application.create(repoUrlParsed, repoBranch)
    } else {
      // dispatch event so the spec can be regenerated
      dispatch('generate', true)
    }
  }

  onDestroy(unsubscribe)
</script>

<style lang="sass">
  @import "./assets/style/theme"

  .repo-info
    display: grid

    @media screen and (min-width: 800px)
      grid-gap: $form-control-margin
      grid-template-columns: 3fr 1fr


  .error-message:first-letter
    text-transform: uppercase
</style>

<section class="repository-form">
  {#if error}
    <Alert
      type={errorType}
      title={error.title}
    >
      <p class="error-message">{error.message}</p>
    </Alert>
  {/if}

  <div class="repo-info">
    <TextInput
      id="repo-url"
      class="repo-field"
      label="Your repo URL"
      required={true}
      valid={repoUrlValid}
      validityMessage="Please enter a valid Repository URL."
      value={repoUrl}
      placeholder="https://github.com/jexia/test-node-app.git"
      on:enter={createApp}
      on:input={event => (repoUrl = event.target.value)}
    />

    <TextInput
      id="repo-branch"
      class="repo-field"
      label="Branch or tag"
      value={repoBranch}
      placeholder="master"
      on:input={event => (repoBranch = event.target.value)}
    />
  </div>

  <div class="spec-form">
    <GenerateSpecTabGroup
      on:validate={({ detail }) => (isSpecValid = detail)}
    />
  </div>

  <div class="form-actions">
    <GenerateButton
      {loading}
      disabled={isGenerateDisabled}
      on:click={createApp}
    >{buttonText}</GenerateButton>
  </div>
</section>
