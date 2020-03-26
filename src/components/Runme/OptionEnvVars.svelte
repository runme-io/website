<script>
    import TextInput from '../UI/TextInput.svelte'
    import Button from '../UI/Button.svelte'
    import Icon from 'fa-svelte'
    import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

    const trashIcon = faTrash

    let envVars = [
        {
            key: 'API_KEY',
            value: 'afasdfi294ulknrl23h4'
        }
    ]

</script>

<div class="env-vars">
    <label>Enter your environment variable</label>
    {#each envVars as { key, value }, i}
        <div class="row">
            <div>
                <TextInput
                    value={key}
                    validityMessage="Please enter a valid Docker image url."
                    placeholder="Your key"
                    on:input={event => (key = event.target.value)}/>
            </div>
            <div>
                <TextInput
                    {value}
                    validityMessage="Please enter a valid Docker image url."
                    placeholder="Your value"
                    on:input={event => (value = event.target.value)}/>
            </div>
            <div>
                <Icon icon={trashIcon}/>
            </div>
        </div>
    {/each}

    <Button mode="outline">Add variable</Button>
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
