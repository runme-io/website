<script>
    import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs'
    import { fade } from 'svelte/transition'
    import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
    import GenerateSpecForm from './GenerateSpecForm.svelte'
    import Button from '../UI/Button.svelte'
    import ButtonIcon from '../UI/ButtonIcon.svelte'
    import Code from '../UI/Code.svelte'
    import GithubPanel from '../UI/Github/GithubPanel.svelte'
    import specGenerator from '../Stores/SpecGenerator'
    import { generateSpec } from '../../Helpers'
    import { DOCKER_SELECT_LANGUAGE, DOCKER_SELECT_SERVICES, ADDITIONAL_SERVICES_LIMIT } from '../../Consts'

    const services = specGenerator()
    const animationOptions = { duration: 200 }

    // add app tab
    services.addService()

    const iconRemove = faTimes
    const iconAdd = faPlusCircle
    const serviceValidity = {}

    let yaml
    let dockerfile

    $: filteredServices = $services.slice(1)
    $: isAddDisabled = $services.length >= ADDITIONAL_SERVICES_LIMIT
    $: isValid = $services.every((_, index) => serviceValidity[index])
    $: isGenerateDisabled = !isValid

    async function generate () {
        ({ yaml, dockerfile } = await generateSpec($services))
    }
</script>

<style lang="sass">
    $tabPadding: .5rem .75rem

    .generate-spec-tab-group
        display: flex
        flex-direction: column

    .generate-spec-tab-group :global(.svelte-tabs li.svelte-tabs__tab)
        padding: $tabPadding

    .tab-add-button
        display: inline-block
        vertical-align: middle

        > :global(button)
            display: flex // TODO: improve css of ButtonIcon
            padding: $tabPadding !important

    .panel-link
        text-decoration: none

    .spec-panel
        margin-top: 2rem
</style>

<div class="generate-spec-tab-group">
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

    <div class="form-actions">
        <Button
            disabled={isGenerateDisabled}
            on:click={generate}
        >Generate spec</Button>
    </div>

    {#if yaml}
        <div
            class="spec-panel"
            in:fade={animationOptions}
        >
            <GithubPanel displayIcon={false}>
                <a
                    href="/"
                    on:click|preventDefault
                    class="panel-link"
                    slot="title"
                >./.runme/config.yaml</a>
                <Code lang="yaml" code={yaml} />
            </GithubPanel>

            {#if dockerfile}
                <GithubPanel displayIcon={false}>
                    <a
                        href="/"
                        on:click|preventDefault
                        class="panel-link"
                        slot="title"
                    >./.runme/Dockerfile</a>
                    <Code lang="dockerfile" code={dockerfile} />
                </GithubPanel>
            {/if}
        </div>
    {/if}
</div>
