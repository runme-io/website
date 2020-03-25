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
    .alert
        position: relative
        padding: 1rem 2rem !important
        margin-bottom: 3rem
        border: 1px solid transparent
        border-radius: .5rem
        font-weight: bold
        font-size: 1.4rem

    .alert--success
        color: #155724
        background-color: #d4edda
        border-color: #c3e6cb

    .alert--danger
        color: #721c24
        background-color: #f8d7da
        border-color: #f5c6cb

    .alert--warning
        color: #856404
        background-color: #fff3cd
        border-color: #ffeeba

    .alert--info
        color: #0c5460
        background-color: #d1ecf1
        border-color: #bee5eb
</style>
