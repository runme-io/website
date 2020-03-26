<script>
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import Icon from 'fa-svelte'
    import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    const trashIcon = faTrash

    let envVars = [
        {
            key: '1PI_KEY',
            value: 'afasdfi294ulknrl23h4',
        },
        {
            key: 'A2PI_KEY',
            value: 'afasdfi294ulknrl23h4',
        },
        {
            key: '3API_KEY',
            value: 'afasdfi294ulknrl23h4',
        }
    ]

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

    $: dispatch('valid', envVars.every(item => notEmpty(item.key) && validKey(item.key) && notEmpty(item.value) ))
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
                    validityMessage="This field is required"
                    placeholder="Your key"
                    on:input={event => (envVar.key = event.target.value)} />
            </div>
            <div>
                <TextInput
                    value={envVar.value}
                    valid={notEmpty(envVar.value)}
                    validityMessage="This field is required"
                    placeholder="Your value"
                    on:input={event => (envVar.value = event.target.value)} />
            </div>
            <div>
                <Button on:click={() => remove(i)} mode="default">
                    <Icon icon={trashIcon}/>
                </Button>
            </div>
        </div>
    {/each}

    <Button on:click={add} mode="outline">Add variable</Button>
</div>

<style lang="sass">

    .env-vars
        margin: 1rem 0 2rem

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
                width: auto
                flex-grow: 1
                text-align: center
</style>
