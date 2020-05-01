<script>
    import { createEventDispatcher } from 'svelte'
    import OptionEnvVars from './Generator/OptionEnvVars.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import InputSwitch from '../UI/InputSwitch.svelte'
    import DockerImageSelect from '../UI/DockerImageSelect.svelte'
    import { isDockerUrl, DOCKER_SELECT_LANGUAGE, DOCKER_SELECT_SERVICES } from '../../Helpers'

    const dispatch = createEventDispatcher()

    export let value = {}
    // The source type of the docker image select
    export let sourceType

    let isApp

    // form states
    let envVarsValid = true // true by default as this is optional
    $: dockerImageValid = value.dockerImage === '' || isDockerUrl(value.dockerImage)

    $: {
        isApp = sourceType === DOCKER_SELECT_LANGUAGE
        if (!isApp) {
            value.hasDockerImage = false
        }
    }
    $: sourceTypeLabel = isApp ? 'app' : 'service'

    function onSubmit () {
        dispatch('submit')
    }
</script>

<style lang="sass">
    @import './assets/style/form'

    .switch
        @include form-control()
        align-items: center
        display: flex
        font-size: $label-font-size

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
                on:checked={({ detail }) => value.hasDockerImage = detail}
            />
        </div>

        {#if value.hasDockerImage}
            <TextInput
                id="docker-image"
                label="Copy your docker image in format <image>:<tag> (optional)"
                valid={dockerImageValid}
                validityMessage="Please enter a valid Docker image url."
                value={value.dockerImage}
                placeholder="<image>:<tag>"
                on:input={({ target }) => value.dockerImage = target.value}
            />
        {/if}
    {/if}
    {#if !value.hasDockerImage}
        <DockerImageSelect
            valid={dockerImageValid}
            validityMessage="A valid docker image is required"
            value={value.dockerImage}
            {sourceType}
            on:change={({ detail }) => value.dockerImage = detail}
        />
    {/if}

    <!-- TODO: add min/max params OR create a HOC for this TextInput? -->
    <TextInput
        id="port"
        label={`Which port does your ${sourceTypeLabel} listens to?`}
        valid={true}
        placeholder="8080"
        type="number"
        min="0"
        value={value.port}
        on:input={({ target }) => value.port = target.value}
    />

    <TextInput
        id="command"
        label={`Which commands should we use to run your ${sourceTypeLabel}?`}
        valid={true}
        placeholder="npm run start"
        value={value.command}
        on:input={({ target }) => value.command = target.value}
    />

    <OptionEnvVars
        value={value.envVars}
        on:items={({ detail }) => value.envVars = detail}
        on:valid={event => envVarsValid = event.detail}
    />
</div>
