<script>
    import { createEventDispatcher } from 'svelte'
    import Icon from 'fa-svelte'
    import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
    import TextInput from '../../UI/TextInput.svelte'
    import Button from '../../UI/Button.svelte'
    import ButtonIcon from '../../UI/ButtonIcon.svelte'
    import InputSwitch from '../../UI/InputSwitch.svelte'

    const dispatch = createEventDispatcher()
    const removeIcon = faTrash
    const addIcon = faPlusCircle

    // the env vars in object format
    export let value

    let useTextarea = true
    let envVars = []
    let envVarsAsText = ''
    let envVarsAsTextValid = false
    let switchText = 'Switch to GUI'

    if (value) {
        envVarsAsText = objectToText(value)
    }

    const notEmpty = (value) => value !== ''
    const validKey = (value) => value.match(/^[A-Z_a-z]+$/)
    const checkVars = () => envVars.every(item => notEmpty(item.key) && validKey(item.key) && notEmpty(item.value))

    $: envVars = convertEnvVarsFromText(envVarsAsText)
    $: envVarsAsTextValid = checkVars(envVars)

    const convertEnvVarsFromText = (textEnvVars) => textEnvVars.split('\n').reduce((accumulator, currentValue) => {
        if (currentValue) {
            const vars = currentValue.split(/=(.+)/)
            const key = vars[0] || ''
            const value = vars[1] || ''
            accumulator = [...accumulator, { key, value }]
        }
        return accumulator
    }, [])

    function convertEnvVarsToText (envVars) {
        return envVars.reduce((accumulator, currentValue) => [...accumulator, `${currentValue.key}=${currentValue.value}`], []).join('\n')
    }

    function objectToText (envVars) {
        return Object.entries(envVars).map(([key, value]) => `${key}=${value}`).join('\n')
    }

    function add () {
        envVars = envVars.concat({ key: '', value: '' })
    }

    function remove (removeIndex) {
        envVars = envVars.filter((elem, index) => index !== removeIndex)
    }

    function switchUI (checked) {
        useTextarea = !checked.detail

        if (useTextarea) {
            switchText = 'Switch to GUI'
            envVarsAsText = convertEnvVarsToText(envVars)
        } else {
            switchText = 'Switch to plain text'
            envVars = convertEnvVarsFromText(envVarsAsText)
        }
    }

    $: envVarsObject = envVars.reduce((accumulator, currentValue) => {
        accumulator[currentValue['key']] = currentValue['value']
        return accumulator
    }, {})

    $: dispatch('valid', checkVars(envVars))
    $: dispatch('items', envVarsObject)
</script>

<div class="env-vars">
    <label>Enter your environment variables</label>

    {#if useTextarea}
        <TextInput
            placeholder="YOUR_ENV_VAR_KEY=example value (put every variable on a new line)"
            controlType="textarea"
            valid={envVarsAsTextValid}
            validityMessage="Invalid values"
            rows="7"
            bind:value={envVarsAsText}
        />
    {:else}
        {#each envVars as envVar, i}
            <div class="row">
                <div>
                    <TextInput
                        value={envVar.key}
                        valid={notEmpty(envVar.key) && validKey(envVar.key)}
                        validityMessage="Invalid key given"
                        placeholder="Your key"
                        on:input={event => (envVar.key = event.target.value)}
                    />
                </div>
                <div>
                    <TextInput
                        value={envVar.value}
                        valid={notEmpty(envVar.value)}
                        validityMessage="Invalid value given"
                        placeholder="Your value"
                        on:input={event => (envVar.value = event.target.value)}
                    />
                </div>
                <div>
                    <ButtonIcon
                        icon={removeIcon}
                        on:click={() => remove(i)}
                        mode="default"
                    />
                </div>
            </div>
        {/each}

        <div class="add-button">
            <ButtonIcon
                flex={true}
                label="Add"
                icon={addIcon}
                mode="outline"
                on:click={add}
            />
        </div>
    {/if}

    <div class="switch">{switchText}&nbsp;<InputSwitch on:checked={switchUI}/></div>

</div>

<style lang="sass">
    .add-button
        margin-top: 1rem

    .env-vars
        margin: 1rem 0 2rem

    .switch
        display: flex
        justify-content: flex-end
        font-size: 1.2rem
        align-items: center

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
                align-items: center
</style>
