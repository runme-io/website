<script>
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let checked = false

    $: dispatch('checked', checked)
</script>

<label class="switch">
    <input type="checkbox" bind:checked={checked}>
    <span class="slider round"></span>
</label>

<style lang="sass">
    @import "../../assets/style/theme"

    /* The switch - the box around the slider */
    .switch
        position: relative
        display: inline-block
        width: 5rem
        height: 2.4rem

        /* Hide default HTML checkbox */
        input
            opacity: 0
            width: 0
            height: 0

    /* The slider */
    .slider
        position: absolute
        cursor: pointer
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: #ccc
        transition: .4s

        &:before
            position: absolute
            content: ""
            height: 1.6rem
            width: 1.6rem
            left: .4rem
            bottom: .4rem
            background-color: white
            transition: .4s

        /* Rounded sliders */
        &.round
            border-radius: 3.4rem

            &:before
                border-radius: 50%

    input:checked + .slider
        background-color: $primary-yellow

    input:focus + .slider
        box-shadow: 0 0 .1rem $primary-yellow

    input:checked + .slider:before
        transform: translateX(2.6rem)
</style>
