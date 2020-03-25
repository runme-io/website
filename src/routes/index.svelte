<script>
	import { onDestroy } from 'svelte'
	import Generator from '../components/Runme/Generator.svelte'
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import { application } from './../components/Stores/Application'
	import MainLayout from '../components/UI/Layout/MainLayout.svelte'

	let showRunmeFooter = false
	let showTechnologyIcons = true

	const unsubscribe = application.subscribe(value => showRunmeFooter = Object.keys(value).length !== 0)

	onDestroy(unsubscribe)

</script>

<MainLayout {showRunmeFooter} {showTechnologyIcons} title="Run your application from any public Git-repo with one click">
	<div class="generator-page">
		<h1>Generate <RunmeButton/>  button for your repo.</h1>
		<Generator/>
	</div>
</MainLayout>

<style lang="sass">
	@import '../assets/style/theme'

	.generator-page
		padding-top: 6rem
		width: 75%
		margin: 0 auto

		@media screen and (max-width: 800px)
			width: 100%

		h1
			text-align: center
			font-size: 2.5rem
</style>
