<script>
    import Icon from 'fa-svelte'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
    import Button from '@ui/Button.svelte'
    import { isGitUrl } from '@helpers/validation.js'

    let showAdvancedOptions = false
    let embedStyle = 'markdown'
    let repoUrl = 'https://github.com/jexia-com/WebApp.git' // TODO remove it later
    let repoBranch = 'master' // TODO remove it later
    let dockerImage = ''
    let embedCode

    function handleMessage(event) {
        alert('clicked');
        console.log(event);
    }

    function toggleAdvanced() {
        showAdvancedOptions = !showAdvancedOptions;
    }

    // generate the embed code right after the embed style has been changed
    function generateEmbedCode() {
        const canShowEmbed = repoUrl !== '' && repoBranch !== ''
        if (canShowEmbed && embedStyle === 'markdown') {
            embedCode = `[![Runme](https://runme.io/static/button.svg)](https://runme.io/runme?repo_url=${repoUrl}&repo_branch=${repoBranch}&docker_image=${dockerImage}`
        } else if (canShowEmbed && embedStyle === 'reStructuredText') {
            embedCode = `.. image:: https://runme.io/static/button.svg\n    :target: https://runme.io/runme?repo_url=repo_url=${repoUrl}&repo_branch=${repoBranch}&docker_image=${dockerImage}`
        }
    }
    $: generateEmbedCode(embedStyle)

</script>

<style lang="sass">
    @import './style.sass'
</style>

<section class="generator">
    <h1>Title</h1>
    <h2>Subtitle</h2>

    <div class="generator__repo-url">
        <input on:keyup={generateEmbedCode} bind:value={repoUrl} placeholder="Please enter your repo url like https://github.com/jexia/test-node-app.git">
        <Button type="submit" on:message={handleMessage}>Generate</Button>
    </div>

    <div class="generator__advanced-options">
        <a on:click={toggleAdvanced}>Advanced options <Icon icon={faSortDown}/></a>
        {#if showAdvancedOptions}
            <input on:keyup={generateEmbedCode} bind:value={dockerImage} placeholder="docker image in format <image>:<tag> (optional)">
        {/if}
    </div>

    <div class="generator__embed-code">
        <div class="generator__embed-code-options">
            <label><input bind:group={embedStyle} type="radio" value="markdown"/> Markdown</label>
            <label><input bind:group={embedStyle} type="radio" value="reStructuredText"/> reStructuredText</label>
        </div>
        <textarea bind:value={embedCode}></textarea>
    </div>

</section>
