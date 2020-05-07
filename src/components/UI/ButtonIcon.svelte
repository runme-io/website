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
    .button-icon
        display: inline-flex
        padding-right: 1rem

    \:global(.button-icon):hover
        \:global(.button-icon-icon)
            transition: all .25s ease-in-out
            transform: scale(1.2)
            color: $gray-medium !important
</style>

<Button
    {...$$restProps}
    class="button-icon {classes}"
    {mode}
    on:click
>
    {#if label}
        <span class="button-icon-label">
            {#if icon} <Icon class="button-icon-icon" {icon}/> {/if}
        </span>
        {label}
    {:else if icon}
        <Icon class="button-icon-icon" {icon}/>
    {/if}
</Button>
