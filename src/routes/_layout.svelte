<script>
  import GoogleAnalytics from '../components/UI/Tracking/GoogleAnalytics.svelte'
  import Hotjar from '../components/UI/Tracking/Hotjar.svelte'
</script>

<style lang="sass" global>
	@import "../assets/style/global.sass"
</style>

<GoogleAnalytics />
<Hotjar />

<slot />
