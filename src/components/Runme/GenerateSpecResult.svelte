<script>
  import { fade } from 'svelte/transition'
  import Code from '../UI/Code.svelte'
  import SpecResultHeader from './SpecGenerator/SpecResultHeader.svelte'
  import GithubPanel from '../UI/GitHub/GithubPanel.svelte'
  import { DEFAULT_TRANSTION } from '../../Consts'

  export let spec

  let dockerfile
  let yaml

  $: {
    ({ yaml, dockerfile } = spec || {})
  }
</script>

<style lang="sass">
  .spec-panel
    display: flex
    margin-top: 2rem

    \:global(.github-panel,.dockerfile-panel)
      flex: 1

    \:global(.dockerfile-panel)
      margin-left: 2rem

  .title-content
    display: contents
</style>

{#if spec}
  <div class="spec-panel" in:fade="{DEFAULT_TRANSTION}">
    <GithubPanel class="github-panel" displayIcon="{false}">
      <div class="title-content" slot="title">
        <SpecResultHeader
          content="{yaml}"
          filename="config.yaml"
          label="./.runme/config.yaml"
        />
      </div>

      <Code lang="yaml" code="{yaml}" />
    </GithubPanel>

    {#if dockerfile}
      <GithubPanel class="dockerfile-panel" displayIcon="{false}">
        <div class="title-content" slot="title">
          <SpecResultHeader
            content="{dockerfile}"
            filename="Dockerfile"
            label="./.runme/Dockerfile"
          />
        </div>

        <Code lang="dockerfile" code="{dockerfile}" />
      </GithubPanel>
    {/if}
  </div>
{/if}
