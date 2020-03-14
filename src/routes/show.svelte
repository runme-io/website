<script>
	import SimpleHeader from '../components/UI/Layout/SimpleHeader.svelte'

	let src = 'https://reinos.nl'

</script>
<svelte:head>
	<title>Runme.io - generate your code to deply</title>
</svelte:head>

<SimpleHeader countDown="{60*10}" countDownTitle="Countdown" title="This application will stay available for 10 minutes."/>
<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>

<style lang="sass">
	@import '../assets/style/theme'

	.deployed-iframe
		display: block
		background: #000
		border: none
		width: 100vw
		height: calc(100vh - 10rem)
</style>
