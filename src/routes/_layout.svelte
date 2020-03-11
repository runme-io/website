<script>
	import Header from '../components/UI/Header.svelte'
	import Footer from '../components/UI/Footer.svelte'

	// export let segment
</script>

<style lang="sass" global>
	@import "./style/global.sass";
</style>

<Header/>
<main>
	<slot></slot>
</main>
<Footer/>
