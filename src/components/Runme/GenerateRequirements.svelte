<script>
    import Icon from 'fa-svelte'
    import { goto } from '@sapper/app'
    import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
    import { GENERATE_SPEC_URL } from '../../Data/menu'

    const runmeSpecUrl = 'https://github.com/jexia-com/runme/blob/master/docs/specification.md'
</script>

<style lang="sass">
    @import './assets/style/theme'
    @import './assets/style/mixins'

    .requirements
        @include flex()
        margin-top: 5rem

        &__icon
            margin-right: .5rem

        h3
            font-size: 1.6rem
            display: inline-flex
            align-items: center

        p
            font-size: $regular-font-size

        ul
            list-style: disc
            padding-left: 1.5rem
            margin: $half-spacing

        li
                list-style: disc
                font-size: $regular-font-size
                margin-bottom: $label-margin

    code
        padding: .2rem .4rem
        color: #c7254e
        background-color: #f9f2f4
        border-radius: .4rem
</style>

<div class="requirements">
    <h3><div class="requirements__icon"><Icon icon={faExclamationCircle} /></div> Requirements</h3>
    <p>In order to run your application properly, there should be at least <strong>ONE</strong> requirement applied to your repository. See <a href="/how-it-works">this</a> page for more information.</p>
    <ul>
        <li>Your repo has a Dockerfile in the root directory</li>
        <li>Your repo contains a <code>package.json</code> with <code>build</code> and <code>start</code> commands defined and exposes the port <code>80</code></li>
        <li>Your repo contains <a href={runmeSpecUrl} target="_blank">Runme specification</a> files inside <code>/.runme</code> directory. This would be the way to go when your application runs with multiple Docker containers. Is the specification too long for you? <a href={GENERATE_SPEC_URL}>Generate the runme specification files</a> by filling a form.</li>
    </ul>
</div>
