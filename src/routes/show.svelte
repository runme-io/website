<script>
	import Loader from '../components/UI/Loader.svelte'
	import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
	import { runmeService } from '../components/Runme/Services'
	import { build } from '../components/Runme/Stores'
	import { queryParam } from '../components/Helpers/QueryParam'
	import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'

	let src
	let iframeLoaded = false
	let errorMsg
	let pollingUrl

	const showError = (msg) => {
		errorMsg = msg
	}

	const urlExists = async (url) => {
		const response = await fetch(url)
		return response.status === 200
	}

	const loadUrl = (url) => {
		urlExists(url).then(exists => {
			if (exists) {
				clearInterval(pollingUrl)
				src = url
				iframeLoaded = true
			} else {
				pollingUrl = setInterval(() => loadUrl(url), 5000)
			}
		})
	}

	// run only in client mode
	if (process.browser) {
		const buildId = queryParam().get('build_id')
		const appId = queryParam().get('app_id')

		if (buildId) {
			runmeService().build(buildId)
				.then(([response]) => {
					build.set(response)
					loadUrl(`https://${response.app_id}.runme.io`)
				})
				.catch(() => {
					let appendError = `<br>Please go to the <a href="/">generator</a> page and create a button and run url.`

					if (appId) {
						appendError = `Please rebuild this application by clicking <a href="/run?app_id=${appId}">here</a>.`
					}

					showError(`No application has been deployed with this build ID "${buildId}". ${appendError}`)
				})
		} else {
			showError('No build_id has been given, please go to the <a href="/">generator</a> page and create a button and run url')
		}
	}
</script>

<svelte:head>
	<title>Runme.io - Run your application from any public Git-repo with one click</title>
</svelte:head>

<FixedHeader countDown={true} timerTitle="Countdown" title="This application will stay available for 10 minutes."/>

{#if src && iframeLoaded}
	<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
{:else if !iframeLoaded && !errorMsg}
	<ContentLayout>
		<div class="loading">
			<Loader size="100" color="#000"/>
			<p>Your application is loading, please wait a couple of seconds...</p>
		</div>
	</ContentLayout>
{:else if errorMsg}
	<ContentLayout>
		<h1>Error</h1>
		<p>{@html errorMsg}</p>
	</ContentLayout>
{/if}

<style lang="sass">
	@import '../assets/style/theme'

	.deployed-iframe
		display: block
		background: $black
		border: none
		width: 100vw
		height: calc(100vh - 10rem)

	.loading
		text-align: center

		p
			padding-top: $spacing
</style>
