<script>
	import Generator from '../components/Runme/Generator.svelte'
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import MainLayout from '../components/UI/Layout/MainLayout.svelte'
</script>
<svelte:head>
	<title>Runme.io - generate your code to deploy</title>
</svelte:head>

<MainLayout>
	<div class="container">
		<div class="generator-page">
			<h1>Generate <RunmeButton/>  button for your repo.</h1>
			<Generator/>
		</div>
	</div>
</MainLayout>

<style lang="sass">
	@import '../assets/style/theme'

	.generator-page
		padding-top: $spacing
		width: 75%
		margin: 0 auto

		h1
			text-align: center
			font-size: 2.2rem
</style>
