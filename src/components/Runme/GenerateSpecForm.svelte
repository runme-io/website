<script>
  import { createEventDispatcher } from 'svelte'
  import OptionEnvVars from './Generator/OptionEnvVars.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import MultipleTextInput from '../UI/MultipleTextInput.svelte'
  import InputSwitch from '../UI/InputSwitch.svelte'
  import DockerImageSelect from '../UI/DockerImageSelect.svelte'
  import { isDockerUrl, isEmpty } from '../../Helpers'
  import { DOCKER_SELECT_LANGUAGE } from '../../Consts'

  const dispatch = createEventDispatcher()

  export let value = {}
  // The source type of the docker image select
  export let sourceType

  // form states
  let envVarsValid = true // true by default as this is optional
  $: isApp = sourceType === DOCKER_SELECT_LANGUAGE
  $: isService = !isApp
  $: sourceTypeLabel = isApp ? 'application' : 'service'
  $: isDockerImageValid = isDockerUrl(value.dockerImage)
  $: isPortValid = isService || !isEmpty(value.port)
  $: isCommandsNotEmpty = Array.isArray(value.command)
    ? value.command.length && !value.command.find(isEmpty)
    : !isEmpty(value.command)
  $: isCommandValid = isService || isCommandsNotEmpty

  $: dispatch('validate',
    envVarsValid
    && isDockerImageValid
    && isPortValid
    && isCommandValid,
  )

  $: {
    if (value.hasDockerImage) {
      value.build_command = '' // clear command when user has docker image
    }
  }

  $: {
    if (isService) {
      value.hasDockerImage = false
    }
  }

  function setDockerImageValue (dockerImageValue) {
    if (!dockerImageValue) {
      value.dockerImage = ''
      return
    }

    const { image, tag, port } = dockerImageValue

    if (port) {
      value.port = port
    }

    value.dockerImage = `${image}:${tag}`
  }
</script>

<style lang="sass">
  @import './assets/style/theme'

  .switch
    align-items: center
    display: flex
    font-size: $label-font-size
    margin-bottom: $form-control-margin

    label
      margin-right: $label-margin
</style>

<div>
  {#if isApp}
    <div class="switch">
      <label>Do you have a built docker image?</label>
      <InputSwitch
        showLabels={true}
        value={value.hasDockerImage}
        on:checked={({ detail }) => (value.hasDockerImage = detail)}
      />
    </div>

    {#if value.hasDockerImage}
      <TextInput
        id="docker-image"
        label="Copy your docker image in format <image>:<tag> (optional)"
        valid={isDockerImageValid}
        validityMessage="Please enter a valid Docker image url."
        value={value.dockerImage}
        placeholder="<image>:<tag>"
        on:input={({ target }) => (value.dockerImage = target.value)}
      />
    {/if}
  {/if}

  {#if !value.hasDockerImage}
    <DockerImageSelect
      valid={isDockerImageValid}
      validityMessage="A valid docker image is required"
      value={value.dockerImage}
      {sourceType}
      on:change={({ detail }) => setDockerImageValue(detail)}
    />

    {#if isApp}
      <TextInput
        id="build_command"
        label={`Which command should we use to build your ${sourceTypeLabel}?`}
        placeholder="npm run build"
        value={value.build_command}
        on:input={({ target }) => (value.build_command = target.value)}
      />
    {/if}
  {/if}

  {#if isApp}
    <TextInput
      id="port"
      label="Which port does your {sourceTypeLabel} expose?"
      required={true}
      valid={isPortValid}
      validityMessage="Port is required"
      placeholder="8080"
      type="number"
      min="0"
      value={value.port}
      on:input={({ target }) => (value.port = target.value)}
    />
  {/if}

  <MultipleTextInput
    id="commands"
    addLabel="Add more commands"
    label="Which commands should we use to run your {sourceTypeLabel}?"
    required={isApp}
    valid={isCommandValid}
    validityMessage="At least one command is required to run your {sourceTypeLabel}"
    placeholder="npm run start"
    value={value.command}
    on:change={({ detail }) => (value.command = detail)}
  />

  <OptionEnvVars
    value={value.envVars}
    on:items={({ detail }) => {
      value.envVars = detail
    }}
    on:valid={({ detail }) => (envVarsValid = detail)}
  />
</div>
