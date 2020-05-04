<script>
    import { createEventDispatcher } from 'svelte'
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
    import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
    import GenerateSpecForm from './GenerateSpecForm.svelte'
    import Button from '../UI/Button.svelte'
    import ButtonIcon from '../UI/ButtonIcon.svelte'
    import specGenerator from '../Stores/SpecGenerator'
    import { DOCKER_SELECT_LANGUAGE, DOCKER_SELECT_SERVICES, generateYaml, generateDockerfile } from '../../Helpers'

    // add app tab
    const services = specGenerator()

    services.addService()

    const dispatch = createEventDispatcher()
    const iconRemove = faTimes
    const iconAdd = faPlusCircle

    $: filteredServices = $services.slice(1)

    let spec
    let dockerFile

    async function generateSpec () {
        spec = await generateYaml($services)

        const appValue = $services[0].value

        dockerFile = !appValue.hasDockerImage ? generateDockerfile(appValue) : ''
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
        padding: $tabPadding
        vertical-align: middle
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
                    on:click={services.addService} />
            </div>
        </TabList>

        {#each $services as service, index}
            <TabPanel>
                <GenerateSpecForm
                    sourceType={index === 0 ? DOCKER_SELECT_LANGUAGE : DOCKER_SELECT_SERVICES }
                    value={service.value}
                    on:submit
                />
            </TabPanel>
        {/each}
    </Tabs>

    <Button on:click={generateSpec}>Generate spec</Button>

    {#if spec}
        <pre>{spec}</pre>
    {/if}

    {#if dockerFile}
        <pre>{dockerFile}</pre>
    {/if}
</div>
