<script>
    import Icon from 'fa-svelte'
    import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
    import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
    import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
    import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

    const twitterIcon = faTwitter
    const facebookIcon = faFacebookSquare
    const linkedInIcon = faLinkedin
    const mailIcon = faEnvelope

    const title = ''
    const text = ''
    const url = 'https://runme.io'
</script>

<ul>
    <li class="twitter"><a target="_blank" href="https://twitter.com/intent/tweet?url={url}&text={title}&hashtags=jexia,runme"><Icon icon={twitterIcon}/></a></li>
    <li class="facebook"><a target="_blank" href="https://www.facebook.com/sharer.php?u={url}"><Icon icon={facebookIcon}/></a></li>
    <li class="mail"><a target="_blank" href="mailto:?subject={title}&body={text}"><Icon icon={mailIcon}/></a></li>
    <li class="linked-in"><a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}"><Icon icon={linkedInIcon}/></a></li>
</ul>

<style lang="sass">
    @import '../../assets/style/theme'

    ul
        display: inline-block

        li
            display: inline-block
            font-size: 1.8rem
            padding: .7rem .9rem
            width: 35px
            height: 35px
            border-radius: 50%

            &.twitter
                background: #00aced
                color: $white

            &.facebook
                background: #3b5998
                color: $white

            &.mail
                background: #e9e9e9
                color: #777

            &.linked-in
                background: #0078b6
                color: $white
</style>
