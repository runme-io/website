<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
    import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
    import GenerateSpecForm from './GenerateSpecForm.svelte'
    import Button from '../UI/Button.svelte'
    import ButtonIcon from '../UI/ButtonIcon.svelte'
    import specGenerator from '../Stores/SpecGenerator'
    import { generateYaml, generateDockerfile } from '../../Helpers'
    import { DOCKER_SELECT_LANGUAGE, DOCKER_SELECT_SERVICES, ADDITIONAL_SERVICES_LIMIT } from '../../Consts'

    const services = specGenerator()

    // add app tab
    services.addService()

    const iconRemove = faTimes
    const iconAdd = faPlusCircle
    const serviceValidity = {}

    let spec
    let dockerFile

    $: filteredServices = $services.slice(1)
    $: isAddDisabled = $services.length >= ADDITIONAL_SERVICES_LIMIT
    $: isValid = $services.every((_, index) => serviceValidity[index])
    $: isGenerateDisabled = !isValid

    async function generateSpec () {
        spec = await generateYaml($services)
        dockerFile = generateDockerfile($services)
    }
</script>

<style lang="sass">
    $tabPadding: .5rem .75rem

    .images-list
        display: contents

    .images-list :global(.svelte-tabs li.svelte-tabs__tab)
        padding: $tabPadding

    .tab-add-button
        display: inline-block
        vertical-align: middle

        > :global(button)
            display: flex // TODO: improve css of ButtonIcon
            padding: $tabPadding !important
</style>

<div class="images-list">
    <Tabs>
        <TabList>
            <Tab>App</Tab>

            {#each filteredServices as service, index}
                <Tab>
                    Service #{index + 1}
                    <ButtonIcon
                        ariaLabel="Remove Service"
                        icon={iconRemove}
                        on:click={() => services.removeService(service)}
                    />
                </Tab>
            {/each}
            <div class="tab-add-button">
                <ButtonIcon
                    ariaLabel="Add Service"
                    icon={iconAdd}
                    disabled={isAddDisabled}
                    on:click={services.addService}
                />
            </div>
        </TabList>

        {#each $services as service, index}
            <TabPanel>
                <GenerateSpecForm
                    sourceType={index === 0 ? DOCKER_SELECT_LANGUAGE : DOCKER_SELECT_SERVICES }
                    value={service}
                    on:validate={({ detail }) => serviceValidity[index] = detail}
                />
            </TabPanel>
        {/each}
    </Tabs>

    <Button
        disabled={isGenerateDisabled}
        on:click={generateSpec}
    >Generate spec</Button>

    {#if spec}
        <pre>{spec}</pre>
    {/if}

    {#if dockerFile}
        <pre>{dockerFile}</pre>
    {/if}
</div>
