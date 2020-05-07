<script>
    export let type = ''

    function classType(){
        switch (type) {
          case 'success':
            return 'alert--success'

          case 'danger':
              return 'alert--danger'

          case 'warning':
              return 'alert--warning'

          case 'info':
              return 'alert--info'
        }
    }
</script>

<div class="alert {classType()}">
    <slot />
</div>

<style lang="sass">
    @import "../../assets/style/theme"

    .alert
        position: relative
        padding: 1rem 2rem !important
        margin-bottom: 3rem
        border: .1rem solid transparent
        border-radius: .5rem
        font-weight: bold
        font-size: 1.4rem

    .alert--success
        color: $success
        background-color: #d4edda
        border-color: #c3e6cb

    .alert--danger
        color: $danger
        background-color: #f8d7da
        border-color: #f5c6cb

    .alert--warning
        color: $warning
        background-color: #fff3cd
        border-color: #ffeeba

    .alert--info
        color: $info
        background-color: #d1ecf1
        border-color: #bee5eb
</style>
