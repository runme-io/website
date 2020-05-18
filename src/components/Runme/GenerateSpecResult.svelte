<script>
  import { fade } from 'svelte/transition'
  import Icon from 'fa-svelte'
  import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
  import Code from '../UI/Code.svelte'
  import CodePiece from '../UI/CodePiece.svelte'
  import SpecResultHeader from './SpecGenerator/SpecResultHeader.svelte'
  import GithubPanel from '../UI/GitHub/GithubPanel.svelte'
  import { DEFAULT_TRANSTION, SPEC_URL } from '../../Consts'

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

    \:global(.github-panel,.dockerfile-panel)
      flex: 1

    \:global(.dockerfile-panel)
      margin-left: 2rem

  .title-content
    display: contents

  // TODO: export external-link into Button component
  .external-link
    position: relative
    margin-right: 1rem

    \:global(.external-icon)
      position: absolute
      right: -1.2rem
      width: 1rem

</style>

{#if spec}
  <p>
    1. Copy the following { dockerfile ? 'files' : 'file' } inside <CodePiece>./.runme</CodePiece> folder in the root of your repository.
    Curious about available options for <CodePiece>config.yaml</CodePiece>? <a class="external-link" href={SPEC_URL} target="_blank">Read the full Runme Specification<Icon class="external-icon" icon={faExternalLinkAlt} /></a> and change it by yourself.
  </p>

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
