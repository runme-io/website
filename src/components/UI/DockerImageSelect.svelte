<script>
    import { createEventDispatcher } from 'svelte'
    import DockerImages from '../Stores/DockerImages'

    const dispatch = createEventDispatcher()

    /*
     * type of the docker image source,
     * available values:
     * - DOCKER_SELECT_LANGUAGE
     * - DOCKER_SELECT_SERVICES
     */
    export let sourceType
    // the object preloaded of docker images
    export let value = null
    export let valid = true
    export let validityMessage = ''

    let imageItem = null
    let tag = ''
    let touched = false

    if (value) {
        const [imageName, tagName] = value.split(':')
        imageItem = items.find(({ image }) => image === imageName)
        tag = tagName
    }
    $: items = $DockerImages[sourceType.key] || []

    $: {
        const composedValue = imageItem && tag ? `${imageItem.image}:${tag}` : null
        valid = Boolean(composedValue)
        dispatch('change', composedValue)
    }

    $: disabled = !imageItem
    $: tags = imageItem ? imageItem.tags : []
    $: invalid = !valid && touched
</script>

<div class="form-control">
    <label for="docker-image">{sourceType.label}</label>
    <select
        class:invalid={invalid}
        id="docker-image"
        bind:value={imageItem}
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
        on:blur={() => touched = true}
    >
        <option value="">Select a tag</option>
        {#each tags as tagName}
            <option>{tagName}</option>
        {/each}
    </select>
    {#if validityMessage && invalid}
        <p class="error-message">{validityMessage}</p>
    {/if}
</div>
