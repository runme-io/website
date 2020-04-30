<script>
    import { createEventDispatcher } from 'svelte'
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
    import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
    import GenerateSpecForm from './GenerateSpecForm.svelte'
    import ButtonIcon from '../UI/ButtonIcon.svelte'
    import specGenerator from '../Stores/SpecGenerator'
    import { DOCKER_SELECT_LANGUAGE, DOCKER_SELECT_SERVICES } from '../../Helpers'

    // add app tab
    const services = specGenerator()

    services.addService()

    const dispatch = createEventDispatcher()
    const iconRemove = faTimes
    const iconAdd = faPlusCircle

    $: filteredServices = $services.slice(1)

    $: {
        const isValid = $services.every(({ valid }) => valid)
        dispatch('validate', isValid)
    }
</script>

<style lang="sass">
    $tabPadding: .5rem .75rem

    .images-list
        display: contents

    .images-list :global(.svelte-tabs .svelte-tabs__tab-list)
        position: relative

    .images-list :global(.svelte-tabs li.svelte-tabs__tab)
        padding: $tabPadding

    .tab-add-button
        padding: $tabPadding
        position: absolute
        right: 0
        top: 0

</style>

<div class="images-list">
    <Tabs>
        <TabList>
            <Tab>App</Tab>

            {#each filteredServices as service, index}
                <Tab>
                    Service #{index}
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
</div>
