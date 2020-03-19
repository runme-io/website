<script>
	import { onDestroy } from 'svelte'
	import Generator from '../components/Runme/Generator.svelte'
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
	import Header from '../components/UI/Layout/Header.svelte'
	import RunmeFooter from '../components/UI/Layout/RunmeFooter.svelte'
	import { application } from './../components/Runme/Stores'

	let showRunmeFooter = false

	const unsubscribe = application.subscribe(value => {
		showRunmeFooter = Object.keys(value).length !== 0
	});

	onDestroy(unsubscribe);

</script>
<svelte:head>
	<title>Runme.io - Run your application from any public Git-repo with one click</title>
</svelte:head>

<div class="page-container">
	<Header/>

	<main>
		<div class="container">
			<div class="generator-page">
				<h1>Generate <RunmeButton/>  button for your repo.</h1>
				<Generator/>
			</div>
		</div>
	</main>

	{#if showRunmeFooter}<RunmeFooter/>{/if}
	<JexiaFooter/>
</div>


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
