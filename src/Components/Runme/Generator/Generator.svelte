<script>
    import Icon from 'fa-svelte'
    import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
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

</section>
