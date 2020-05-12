<script>
  import { createEventDispatcher } from 'svelte'
  import { faTimes } from '@fortawesome/free-solid-svg-icons'
  import TextInput from './TextInput.svelte'
  import ButtonIcon from './ButtonIcon.svelte'
  import FormControl from './Form/FormControl.svelte'

  const dispatch = createEventDispatcher()
  const createInputDescriptor = (value = '', focus = false) => ({ value, focus })

  // the label to be shown in the "Add" link
  export let addLabel
  export let label
  export let id
  export let value

  let inputList

  if (value) {
    inputList = Array.isArray(value)
      ? value.map(_value => createInputDescriptor(_value))
      : [createInputDescriptor(value)]
  } else {
    inputList = [createInputDescriptor()]
  }

  function addInput () {
    inputList = inputList
      .map(({ value }) => ({ value, focus: false }))
      .concat({ value: '', focus: true })
  }

  function removeInput (inputIndex) {
    inputList = inputList.filter((_, index) => index !== inputIndex)
    dispatchChange()
  }

  function onInput (input, value) {
    input.value = value
    dispatchChange()
  }

  function dispatchChange () {
    const filteredValues = inputList
      .map(({ value }) => value.trim())
      .filter(Boolean)

    const resultValue = filteredValues.length === 1
      ? filteredValues[0]
      : filteredValues

    dispatch('change', resultValue)
  }
</script>

<style lang="sass">
  @import './assets/style/theme'

  .input-container
    align-items: center
    display: flex

  .button-remove
    margin-left: $form-control-margin

</style>

<FormControl
  required={$$restProps.required}
>
  <label for={id}>{label}</label>

  {#each inputList as input, index}
    <div class="input-container">
      <TextInput
        id={index === 0 ? id : null}
        compact={true}
        focus={input.focus}
        value={input.value}
        {...$$restProps}
        on:input={({ target }) => onInput(input, target.value)}
      />

      {#if index}
        <div class="button-remove">
          <ButtonIcon
            aria-label="Remove"
            icon={faTimes}
            on:click={() => removeInput(index)}
          />
        </div>
      {/if}
    </div>
  {/each}

  <a
    href="/"
    on:click|preventDefault={addInput}
  >{addLabel}</a>
</FormControl>
