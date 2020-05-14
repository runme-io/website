<script>
  import { createEventDispatcher, onDestroy } from 'svelte'
  import GenerateButton from './Generator/GenerateButton.svelte'
  import { application } from '../Stores/Application'
  import TextInput from '../UI/TextInput.svelte'
  import Alert from '../UI/Alert.svelte'
  import { isEmpty, isGitUrl, queryParam, parseGitUrl } from '../../Helpers'

  const dispatch = createEventDispatcher()

  // form fields
  let repoUrl = ''
  let repoUrlParsed = ''
  let repoBranch // default branch should be filled by store

  // form states
  let repoUrlValid
  let formIsValid

  // others
  let loading = false
  let buttonText = 'Generate'
  let errorMsg = ''
  let appId = ''
  let errorType = 'warning'

  // ensure correct GIT url
  $: parseGitUrl(repoUrl).then(url => (repoUrlParsed = url))

  // check if the fields are valid
  $: repoUrlValid = !isEmpty(repoUrlParsed) && isGitUrl(repoUrlParsed)
  $: formIsValid = repoUrlValid // TODO && spec form valid

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

  function createApp () {
    if (!formIsValid) { return }

    // set the button to loading
    isLoading(true)

    // clear previous errors
    clearError()

    // create an application and assign it to the store
    application.create(repoUrlParsed, repoBranch)
    // TODO: generate spec
  }

  onDestroy(unsubscribe)
</script>

<style lang="sass">
  @import './assets/style/theme'
  @import './assets/style/mixins'

  .repo-info
    display: grid

    @media screen and (min-width: 800px)
      grid-gap: $form-control-margin
      grid-template-columns: 3fr 1fr

</style>

<section class="repository-form">
  {#if errorMsg}<Alert type={errorType}>{errorMsg}</Alert>{/if}

  <div class="repo-info">
    <TextInput
      id="repo-url"
      class="repo-field"
      label="Your repo URL"
      valid={repoUrlValid}
      validityMessage="Please enter a valid Repository url."
      value={repoUrl}
      placeholder="https://github.com/jexia/test-node-app.git"
      on:enter={createApp}
      on:input={event => (repoUrl = event.target.value)}
    />

    <TextInput
      id="repo-branch"
      class="repo-field"
      label="Branch"
      value={repoBranch}
      placeholder="master"
      on:input={event => (repoBranch = event.target.value)}
    />
  </div>

  <div class="form-actions">
    <GenerateButton
      {loading}
      disabled={!formIsValid}
      on:click={createApp}
    >{buttonText}</GenerateButton>
  </div>
</section>
