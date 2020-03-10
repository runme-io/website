<script>
	import Header from '@ui/Header.svelte'
	import Footer from '@ui/Footer.svelte'
	import Generator from '@runme/Generator/Generator.svelte'
</script>

<main>
	<Header/>
	<Generator/>
	<Footer/>
</main>

<style global lang="sass">
	@import './assets/styles/fonts.sass'

	html
		font-family: Roboto,Arial,Helvetica,sans-serif
</style>
