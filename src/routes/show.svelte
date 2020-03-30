<script>
	import Loader from '../components/UI/Loader/Loader.svelte'
	import FixedHeader from '../components/UI/Layout/FixedHeader.svelte'
	import { build } from '../components/Stores/Build'
	import { header } from '../components/Stores/Header'
	import { queryParam } from '../components/Helpers/QueryParam'
	import ContentLayout from '../components/UI/Layout/ContentLayout.svelte'
	import { onDestroy } from 'svelte'
	import LoadingBlock from '../components/UI/Loader/LoadingBlock.svelte'

	let src
	let iframeLoaded = false
	let errorMsg
	let pollingInterval = null

	const buildId = queryParam().get('build_id')

	const showError = (msg) => {
		errorMsg = msg
		clearInterval(pollingInterval)
	}

	const urlExists = async (url) => {
		if (process.browser) {
			const response = await fetch(url)
			return response.status === 200
		}
	}

	const loadUrl = (url) => {
		if (process.browser) {
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
	}

	const unsubscribe = build.subscribe(({ error, updated_at }) => {
		if (error) {
			showError(`Go to the Git-repo of your runme button or go to the <a href="/">generator</a> page and create a new one.`)
			header.setFailed(true, 'Error')
		} else {
			header.showCountDown(updated_at)
			loadUrl(`https://${buildId}.runme.io`)
		}
	})

	if (process.browser) {
		if (buildId) {
			build.get(buildId)
		} else {
			showError('No build_id has been given, please go to the <a href="/">generator</a> page and create a button and run url')
		}
	}

	onDestroy(unsubscribe)
</script>

<svelte:head>
	<title>Runme.io</title>
</svelte:head>

<FixedHeader timerTitle="Countdown" title="This application will stay available for 10 minutes."/>

{#if src && iframeLoaded}
	<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
{:else if !iframeLoaded && !errorMsg}
	<ContentLayout>
		<LoadingBlock>
			Your application is loading, please wait a couple of seconds...
		</LoadingBlock>
	</ContentLayout>
{:else if errorMsg}
	<ContentLayout>
		<h1>Error</h1>
		<p>{@html errorMsg}</p>
	</ContentLayout>
{/if}

<style lang="sass">
	.deployed-iframe
		display: block
		border: none
		width: 100vw
		height: calc(100vh - 10rem)
</style>
