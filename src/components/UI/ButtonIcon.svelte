<script>
    import Icon from 'fa-svelte'
    import Button from './Button.svelte'

    export let icon = null
    export let label = ''
    export let mode = 'default'

   $: classes = $$restProps.class || ''
</script>

<style lang="sass">
    @import './assets/style/theme'
    .button-icon-label
        margin-left: $label-margin

    \:global(.button-icon)
        display: inline-flex
        padding-right: 1rem

        &:hover
            \:global(.button-icon-icon)
                transition: all .25s ease-in-out
                transform: scale(1.2)
                color: $gray-medium !important
</style>

<Button
    class="button-icon {classes}"
    {...$$restProps}
    {mode}
    on:click
>
    <Icon class="button-icon-icon" {icon}/>
    {#if label}
        <span class="button-icon-label">{label}</span>
    {/if}
</Button>
