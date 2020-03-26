<script>
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import Icon from 'fa-svelte'
    import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
    import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    const removeIcon = faTrash
    const addIcon = faPlusCircle

    let envVars = []

    const perpareVars = () => envVars.reduce((accumulator, currentValue) => {
        accumulator[currentValue['key']] = currentValue['value']
        return accumulator
    }, {})

    const notEmpty = (value) => value !== ''
    const validKey = (value) => value.match(/^[A-Z_a-z]+$/)

    function add() {
        envVars = envVars.concat({ key: '', value: '' })
    }

    function remove(removeIndex) {
        envVars = envVars.filter((elem, index) => index !== removeIndex)
    }

    $: dispatch('valid', envVars.every(item => notEmpty(item.key) && validKey(item.key) && notEmpty(item.value)))
    $: dispatch('items', perpareVars(envVars))
</script>

<div class="env-vars">
    <label>Enter your environment variable</label>
    {#each envVars as envVar, i}
        <div class="row">
            <div>
                <TextInput
                    value={envVar.key}
                    valid={notEmpty(envVar.key) && validKey(envVar.key)}
                    validityMessage="Invalid value for the key"
                    placeholder="Your key"
                    on:input={event => (envVar.key = event.target.value)} />
            </div>
            <div>
                <TextInput
                    value={envVar.value}
                    valid={notEmpty(envVar.value)}
                    validityMessage="Invalid value for the value"
                    placeholder="Your value"
                    on:input={event => (envVar.value = event.target.value)} />
            </div>
            <div>
                <Button on:click={() => remove(i)} mode="default">
                    <Icon icon={removeIcon}/>
                </Button>
            </div>
        </div>
    {/each}

    <div class="add-button">
        <Button flex={true} on:click={add} mode="outline">
            <span class="button-icon"><Icon icon={addIcon}/></span> Add
        </Button>
    </div>
</div>

<style lang="sass">
    .add-button
        margin-top: 1rem

    .env-vars
        margin: 1rem 0 2rem

    .button-icon
        display: inline-flex
        padding-right: 1rem

    label
        display: block
        width: 100%
        font-size: 1.4rem

    .row
        display: flex
        flex-direction: row
        flex-wrap: wrap
        align-items: baseline

        > div
            width: 45%

            &:first-child
                padding-right: 1rem

            &:nth-child(2)
                padding-left: 1rem

            &:last-child
                width: 10%
                flex-grow: 1
                text-align: center
                align-self: center
</style>
