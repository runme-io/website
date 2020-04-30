<script>
    import Icon from 'fa-svelte'
    import Button from './Button.svelte'

    export let ariaLabel = null
    export let icon = null
    export let label = ''
    export let flex = false
    export let mode = 'default'
</script>

<style lang="sass">
   .button-icon
        display: inline-flex
        padding-right: 1rem
</style>

<Button
    {ariaLabel}
    {flex}
    {mode}
    on:click
>
    {#if label}
        <span class="button-icon">
            {#if icon} <Icon {icon}/> {/if}
        </span>
        {label}
    {:else if icon}
        <Icon {icon}/>
    {/if}
</Button>
