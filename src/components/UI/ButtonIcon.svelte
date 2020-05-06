<script>
    import Icon from 'fa-svelte'
    import Button from './Button.svelte'

    export let icon = null
    export let label = ''
    export let mode = 'default'
</script>

<style lang="sass">
   .button-icon
        display: inline-flex
        padding-right: 1rem
</style>

<Button
    {...$$restProps}
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
