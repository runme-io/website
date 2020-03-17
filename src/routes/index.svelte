<script>
	import Generator from '../components/Runme/Generator.svelte'
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import JexiaFooter from '../components/UI/Layout/JexiaFooter.svelte'
	import Header from '../components/UI/Layout/Header.svelte'
	import RunmeFooter from '../components/UI/Layout/RunmeFooter.svelte'
	import { embedCodeGenerated } from './../components/Runme/Stores'
</script>
<svelte:head>
	<title>Runme.io - generate your code to deploy</title>
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

	{#if $embedCodeGenerated}<RunmeFooter/>{/if}
	<JexiaFooter/>
</div>


<style lang="sass">
	@import '../assets/style/theme'

	.generator-page
		padding-top: 6rem
		width: 75%
		margin: 0 auto

		h1
			text-align: center
			font-size: 2.5rem
</style>
