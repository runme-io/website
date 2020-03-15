<script>
	import SimpleHeader from '../components/UI/Layout/SimpleHeader.svelte'
	import { runmeBuild } from '../components/Runme/Service'
	import { parse } from 'qs'
	import { goto } from '@sapper/app'
	import { build } from '../components/Runme/stores.js'
	import Alert from '../components/UI/Alert.svelte'

	let src
	let notFound = false

	if (process.browser) {
		const parsed = parse(window.location.search.replace('?', ''))

		// no app_id? just redirect back
		if (!Object.keys(parsed).includes('build_id')) {
			goto('/')
		}

		const { build_id } = parsed

		runmeBuild(build_id)
			.then(([response]) => {
				build.set(response)
				src = `http://${response.app_id}.runme.io`
			})
			.catch(() => notFound = true)
	}
</script>
<svelte:head>
	<title>Runme.io - generate your code to deply</title>
</svelte:head>

<SimpleHeader countDown={true} timerTitle="Countdown" title="This application will stay available for 10 minutes."/>

{#if src}
	<iframe class="deployed-iframe" title="Your deployed app" {src}></iframe>
{:else if notFound}
	<main class="main-content">
		<h1>Website/application offline</h1>
		<p>This website/applications seems to be offline.</p>
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
