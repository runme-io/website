<script>
    import Icon from 'fa-svelte'
    import { faDocker } from '@fortawesome/free-brands-svg-icons/faDocker'
    import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
    import { build } from '../../Stores/Build'

    let show = false
    let icon = faDocker

    function toggle() {
        if (!show) {
            show = true
            icon = faTimes
        } else {
            show = false
            icon = faDocker
        }

    }
</script>

<style lang="sass">
    @import './assets/style/theme'

    $docker-background: #edf5fc
    $docker-border-color: #d2dae1

    .docker-build-command
        position: absolute
        display: flex
        align-items: center
        height: 4rem
        overflow: hidden
        margin-top: 2rem
        background: $docker-background
        border: .1rem solid $docker-border-color
        border-left: none
        text-align: center
        border-top-right-radius: 1rem
        border-bottom-right-radius: 1rem
        box-shadow: 0.1rem 0.3rem 0.6rem 0 rgba(0, 0, 0, .2)
        transition: .1s all

        &.open
            padding-right: 1rem

        &:not(.open):hover
            .hint
                display: block

    .icon
        padding: 1rem
        cursor: pointer
        display: flex

        .hint
            display: none
            font-size: 1.1rem
            margin-right: .5rem

    p
        display: inline-block
        margin-left: .5rem
        font-size: 1.2rem

</style>

<div class="docker-build-command" class:open={show}>
    <div class="icon" on:click={toggle}>
        <div class="hint">run locally?</div>
        <Icon {icon} />
    </div>

    {#if show}
        <p>
            <code>docker pull {$build.docker_image}</code> (available for 10 min.)
        </p>
    {/if}
</div>
