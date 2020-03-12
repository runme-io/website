<script>

    let cssClass = null;
    export { cssClass as class };
</script>

<button class={`btn ${cssClass || ''}`} on:click>
    <slot/>
</button>

<style lang="sass">
    @import '../../assets/style/theme'
    .btn
        display: inline-block
        padding: .5rem 1.5rem
        text-align: center
        font-size: 1.8rem
        color: $white
        background-color: #555
        border: 1px solid transparent
        border-radius: .3rem
        margin-top: 2rem
        margin-bottom: 2rem
        cursor: pointer
        outline: none
        box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.4)
        transition: .3s all

        &:active
            box-shadow: 0.2rem 0.2rem 0.1rem rgba(0, 0, 0, 0.4)
</style>
