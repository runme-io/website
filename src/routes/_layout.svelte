<script>
	import Header from '../components/UI/Header.svelte'
	import Footer from '../components/UI/Footer.svelte'

	// export let segment
</script>

<style lang="sass" global>
	@import "../assets/style/global.sass"

	main
		padding-left: $spacing
		padding-right: $spacing
</style>

<Header/>
<main>
	<slot></slot>
</main>
<Footer/>
