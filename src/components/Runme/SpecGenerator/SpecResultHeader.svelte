<script>
    import { fade } from 'svelte/transition'
    import { faCopy, faFileDownload } from '@fortawesome/free-solid-svg-icons'
    import ButtonIcon from '../../UI/ButtonIcon.svelte'

    const animationOptions = { duration: 200 }
    const MESSAGE_DELAY = 3000

    export let content
    export let filename
    export let label

    let linkElement
    let copied = false
    let copyMessageTimeout

    $: copyLabel = `Copy ${filename} content`
    $: downloadLabel = `Download ${filename}`

    function download () {
        const blob = new Blob([content], { type: 'application/octet-stream' })

        linkElement.href = window.URL.createObjectURL(blob)
        linkElement.target = '_blank'
        linkElement.download = filename

        setTimeout(() => window.URL.revokeObjectURL(linkElement.href), 100)
    }

    async function copy () {
        try {
            if (copyMessageTimeout) {
                clearTimeout(copyMessageTimeout)
            }
            await navigator.clipboard.writeText(content)
            copied = true
            copyMessageTimeout = setTimeout(() => copied = false, MESSAGE_DELAY)
        } catch (e) {
            console.error(e)
        }
    }
</script>

<style lang="sass">
    @import './assets/style/theme'

    .header-title
        display: flex
        flex: 1
        justify-content: space-between

    .download-button
        text-decoration: none

    .button-container
        display: flex
        align-items: center

        \:global(.button-icon)
            margin-left: 1rem

        span
            font-size: 1.2rem
            color: $success
            pointer-events: none
</style>

<div class="header-title">
    <a
        bind:this={linkElement}
        href="#/"
        on:click={() => download()}
        class="download-button"
        title={downloadLabel}
    >{label}</a>

    <div class="button-container">
        {#if copied}
            <span
                in:fade={animationOptions}
                out:fade={animationOptions}
            >File content copied!</span>
        {/if}
        <ButtonIcon
            class="button-copy"
            flex={true}
            aria-label={copyLabel}
            icon={faCopy}
            on:click={copy}
        />
        <ButtonIcon
            class="button-download"
            flex={true}
            aria-label={downloadLabel}
            icon={faFileDownload}
            on:click={linkElement.click()}
        />
    </div>
</div>
