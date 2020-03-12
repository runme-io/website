<script>
	import ShowLayout from '../components/UI/ShowLayout.svelte'

	let src = ''
</script>
<svelte:head>
	<title>Runme.io - generate your code to deply</title>
</svelte:head>

<ShowLayout>
	<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
</ShowLayout>

<style lang="sass">
	@import '../assets/style/theme'

	.deployed-iframe
		display: block
		background: #000
		border: none
		width: 100vw
		height: calc(100vh - 300px)
</style>
