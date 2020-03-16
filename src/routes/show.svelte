<script>
	import SimpleHeader from '../components/UI/Layout/SimpleHeader.svelte'
	import { runmeService } from '../components/Runme/Services'
	import { build } from '../components/Runme/stores.js'
	import { queryParam } from '../components/Helpers/QueryParam'

	let src
	let errorMsg

	const showError = (msg) => {
		errorMsg = msg
	}

	// run only in client mode
	if (process.browser) {
		const buildId = queryParam().get('build_id');

		if (buildId) {
			runmeService().build(buildId)
					.then(([response]) => {
						build.set(response)
						src = `http://${response.app_id}.runme.io`
					})
					.catch(() => showError(`No application has been deployed with build ID "${buildId}". Please generate an build <a href="/">here</a>.`))
		} else {
			showError()
		}
	}
</script>
<svelte:head>
	<!-- TODO show the repo url in the title? -->
	<title>Runme.io - </title>
</svelte:head>

<SimpleHeader countDown={true} timerTitle="Countdown" title="This application will stay available for 10 minutes."/>

{#if src}
	<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
{:else if errorMsg}
	<main class="main-content">
		<h1>Error</h1>
		<p>{@html errorMsg}</p>
	</main>
{/if}

<style lang="sass">
	@import '../assets/style/theme'

	.deployed-iframe
		display: block
		background: #000
		border: none
		width: 100vw
		height: calc(100vh - 10rem)
</style>
