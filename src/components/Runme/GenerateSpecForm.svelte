<script>
    import { createEventDispatcher } from 'svelte'
    import OptionEnvVars from './Generator/OptionEnvVars.svelte'
    import TextInput from '../UI/TextInput.svelte'
    import InputSwitch from '../UI/InputSwitch.svelte'
    import DockerImageSelect from '../UI/DockerImageSelect.svelte'
    import { isDockerUrl } from '../../Helpers'

    const dispatch = createEventDispatcher()

    export let value = {}
    // The source type of the docker image select
    export let sourceType

    // form states
    let envVarsValid = true // true by default as this is optional

    // check if the fields are valid
    $: dockerImageValid = value.dockerImage === '' || isDockerUrl(value.dockerImage)

    function onSubmit () {
        dispatch('submit')
    }
</script>

<style lang="sass">
    @import './assets/style/form'

    .switch
        align-items: center
        display: flex
        font-size: $label-font-size
        margin-bottom: $label-margin

        label
            margin-right: $label-margin
</style>

<div>
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
    {:else}
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
        label="Which port does your app listens to?"
        valid={true}
        placeholder="8080"
        type="number"
        value={value.port}
        on:input={({ target }) => value.port = target.value}
    />

    <TextInput
        id="command"
        label="Which commands should we use to run your app?"
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
