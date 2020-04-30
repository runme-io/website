<script>
    import { createEventDispatcher } from 'svelte'
    import dockerImages from '../../resources/docker-images.json'
    import { DOCKER_SELECT_TYPE } from '../../Helpers'

    const dispatch = createEventDispatcher()

    /*
     * type of the docker image source,
     * available values:
     * - DOCKER_SELECT_TYPE.LANGUAGE
     * - DOCKER_SELECT_TYPE.SERVICES
     */
    export let sourceType = DOCKER_SELECT_TYPE.LANGUAGE
    export let label = null
    export let value = null
    export let valid = false
    export let validityMessage = ''

    let imageItem = ''
    let tag = ''
    let touched = false

    $: {
        value = imageItem && tag ? `${imageItem.image}:${tag}` : ''
        valid = Boolean(value)
    }

    $: disabled = !imageItem
    $: tags = imageItem ? imageItem.tags : []
    $: invalid = !valid && touched
    $: items = dockerImages[sourceType]
</script>

<style lang="sass">
    @import "../../assets/style/theme"
    @import "../../assets/style/form"

    select
        border: .1rem solid $input-main-color
        background: white
        transition: border-color .1s ease-out

        &:focus
            border-color: #e40763
            outline: none

    label
        @include label()

    .form-control
        @include form-control()

    .invalid
        @include input-invalid()

    .error-message
        @include input-validation-message()
</style>

<div class="form-control">
    {#if label}<label for="docker-image">{label}</label>{/if}
    <select
        class:invalid={invalid}
        id="docker-image"
        bind:value={imageItem}
        on:blur={() => touched = true}
    >
        <option value="">Select a docker image</option>
        {#each items as item}
            <option value={item}>{item.name}</option>
        {/each}
    </select>
    <span>:</span>
    <select
        {disabled}
        bind:value={tag}
    >
        <option value="">Select a tag</option>
        {#each tags as tag}
            <option>{tag}</option>
        {/each}
    </select>
    {#if validityMessage && invalid}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>
