<script>
    import { createEventDispatcher } from 'svelte'
    import { faTimes } from '@fortawesome/free-solid-svg-icons'
    import TextInput from './TextInput.svelte'
    import ButtonIcon from './ButtonIcon.svelte'

    const dispatch = createEventDispatcher()
    const createInputDescriptor = (value = '', focus = false) => ({ value, focus })

    // it should accept all InputText props
    const { label, id, value, ...inputProps } = $$props
    delete inputProps.addLabel

    // the label to be shown in the "Add" link
    export let addLabel

    let inputList

    if (value) {
        inputList = typeof value === 'string'
            ? [createInputDescriptor(value)]
            : value.map(_value => createInputDescriptor(_value))
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
    @import './assets/style/form'

    .form-control
        @include form-control()

    .input-container
        align-items: center
        display: flex

    .button-remove
        margin-left: $form-control-margin

    label
        @include label()
</style>

<div class="form-control">
    <label for={id}>{label}</label>

    {#each inputList as input, index}
        <div class="input-container">
            <TextInput
                id={index === 0 ? id : null}
                compact={true}
                focus={input.focus}
                value={input.value}
                {...inputProps}
                on:input={({ target }) => onInput(input, target.value)}
            />
            {#if index}
                <div class="button-remove">
                    <ButtonIcon
                        ariaLabel="Remove"
                        icon={faTimes}
                        on:click={() => removeInput(index)}
                    />
                </div>
            {/if}
        </div>
    {/each}
    <a href="/" on:click|preventDefault={addInput}>{addLabel}</a>
</div>
