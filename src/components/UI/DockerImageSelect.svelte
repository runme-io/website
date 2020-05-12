<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import FormControl from './Form/FormControl.svelte'
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

  $: items = $DockerImages[sourceType.key] || []
  $: hasValidSelection = imageItem && tag
  $: disabled = !imageItem
  $: tags = imageItem ? imageItem.tags : []
  $: invalid = !valid && touched

  $: {
    dispatch('change', hasValidSelection ? getValue() : null)
  }

  function getValue () {
    const { image, container_port: port } = imageItem

    return {
      image,
      tag,
      port,
    }
  }

  onMount(() => {
    const [imageName, tagName] = (value || '').split(':')
    imageItem = items.find(({ image }) => image === imageName)
    tag = tagName
  })
</script>

<FormControl
  required={$$restProps.required}
  hasError={invalid}
  {validityMessage}
>
  <label for="docker-image">{sourceType.label}</label>
  <select
    class:invalid={invalid}
    id="docker-image"
    bind:value={imageItem}
    on:change={() => {
      tag = '' // reset tag value
    }}
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
    on:blur={() => {
      touched = true
    }}
  >
    <option value="">Select a tag</option>
    {#each tags as tagName}
      <option>{tagName}</option>
    {/each}
  </select>
</FormControl>
