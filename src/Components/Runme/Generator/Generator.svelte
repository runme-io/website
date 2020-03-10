<script>
    import Button from '@ui/Button.svelte'
    let repositoryUrl

    function handleMessage(event) {
        alert('clicked');
        console.log(event);
    }

</script>

<style lang="sass">
    @import './style.sass'
</style>

<section class="generator">
    <h1>Title</h1>
    <h2>Subtitle</h2>

    <div class="generator__repo-url">
        <input bind:value={repositoryUrl} placeholder="enter your name">
        <Button type="submit" on:message={handleMessage}>Generate</Button>

    </div>

    <p>Hello {repositoryUrl || 'stranger'}!</p>
</section>
