<script>
	import Loader from '../components/UI/Loader.svelte'
	import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
	import { build } from '../components/Stores/Build'
	import { application } from '../components/Stores/Application'
	import { queryParam } from '../components/Helpers/QueryParam'
	import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
	import { onDestroy } from 'svelte'

	let src
	let iframeLoaded = false
	let errorMsg
	let pollingInterval = null
	let repoName

	const buildId = queryParam().get('build_id')
	const appId = queryParam().get('app_id')

	const showError = (msg) => {
		errorMsg = msg
	}

	const urlExists = async (url) => {
		if (process.browser) {
			const response = await fetch(url)
			return response.status === 200
		}
	}

	const loadUrl = (url) => {
		urlExists(url).then(exists => {
			if (exists) {
				clearInterval(pollingInterval)
				src = url
				iframeLoaded = true
			} else {
				pollingInterval = setInterval(() => loadUrl(url), 5000)
			}
		})
	}

	const unsubscribe = build.subscribe(({ error }) => {
		if (error) {
			let appendError = `<br>Please go to the <a href="/">generator</a> page and create a button and run url.`

			if (appId) {
				appendError = `Please rebuild this application by clicking <a href="/run?app_id=${appId}">here</a>.`
			}

			showError(`No application has been deployed with this build ID "${buildId}". ${appendError}`)
		} else {
			loadUrl(`https://${buildId}.runme.io`)
		}
	})

	if (process.browser) {
		// fetching the application from the Jexia Dataset
		application.get(appId)

		if (buildId) {
			build.get(buildId)
		} else {
			showError('No build_id has been given, please go to the <a href="/">generator</a> page and create a button and run url')
		}
	}

	onDestroy(unsubscribe)
</script>

<svelte:head>
	<title>Runme.io - {repoName} Repository</title>
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
		border: none
		width: 100vw
		height: calc(100vh - 10rem)

	.loading
		text-align: center

		p
			padding-top: $spacing
</style>
