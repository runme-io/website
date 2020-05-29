<script>
  import { faCopy, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
  import { faDocker } from '@fortawesome/free-brands-svg-icons'
  import { CopyToClipboard, modal } from '../../../Helpers'
  import DockerCommandsModal from '../Modals/DockerCommandsModal.svelte'
  import { ButtonDropdown, ButtonDropdownOption } from '../Button'

  export let dockerImage = ''
  export let deployUrl = ''
  export let applicationUrl = ''
  export let showPlaceholderDeployButton = false

  const NOTIFICATION_DELAY = 3000

  let copiedText = ''
  let copyMessageTimeout = null

  async function copyAppUrl () {
    if (copyMessageTimeout) {
      clearTimeout(copyMessageTimeout)
    }

    const success = await CopyToClipboard(applicationUrl)
    if (success) {
      copiedText = 'Copied!'
      copyMessageTimeout = setTimeout(() => (copiedText = ''), NOTIFICATION_DELAY)
    }
  }

  function openModal () {
    modal({
      content: DockerCommandsModal,
      componentProps: { dockerImage },
    })
  }
</script>

{#if applicationUrl || dockerImage || deployUrl}
  <ButtonDropdown
    mode="outline"
    label="Actions"
  >
    {#if applicationUrl}
      <ButtonDropdownOption
        icon={faCopy}
        label="Copy url"
        description="Click to copy the application url"
        notification={copiedText}
        notificationDelay={NOTIFICATION_DELAY}
        click={copyAppUrl}
      />
    {/if}

    {#if dockerImage}
      <ButtonDropdownOption
        icon={faDocker}
        label="Run locally"
        description="Build and deploy your application locally with Docker"
        click={openModal}
      />
    {/if}

    {#if deployUrl}
      <ButtonDropdownOption
        icon={faCloudUploadAlt}
        label="Deploy permanent"
        description="Deploy your application to the Jexia platform"
        href={deployUrl}
        target="_blank"
      />
    {/if}

    {#if showPlaceholderDeployButton}
      <ButtonDropdownOption
        icon={faCloudUploadAlt}
        label="Deploy permanent"
        description="Coming soon: Deploy your application to the Jexia platform"
        target="_blank"
        disabled={true}
      />
    {/if}
  </ButtonDropdown>
{/if}
