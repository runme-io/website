<script>
    import { createEventDispatcher } from 'svelte'

    export let type

    const dispatch = createEventDispatcher()

    function emit() {
        dispatch('message')
    }
</script>

<button {type} class="btn" on:click={emit}>
    <slot/>
</button>

<style lang="sass">
    .btn
        display: inline-block
        padding: .5rem 1.5rem
        text-align: center
        font-size: 1.4rem
        color: #fff
        background-color: #555
        border: 1px solid transparent
        border-radius: .3rem
</style>
