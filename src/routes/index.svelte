<script>
	import { onDestroy } from 'svelte'
	import Icon from 'fa-svelte'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import GenerateForm from '../components/Runme/GenerateForm.svelte'
	import MainLayout from '../components/UI/Layout/MainLayout.svelte'
	import TextInput from '../components/UI/TextInput.svelte'
	import GithubReadme from '../components/UI/GitHub/GithubReadme.svelte'
	import { setUrl } from '../Helpers'

	// form fields
	let embedStyle = 'markdown'

	// others
	let embedCode = ''
	let showRunmeFooter = false
	$: canShowEmbed = embedCode

	function showEmbedCode (appId) {
		// show the footer
		showRunmeFooter = true

		const runUrl = setUrl(`run?app_id=${appId}`)

		if (embedStyle === 'markdown') {
			embedCode = `[![Runme](https://svc.runme.io/static/button.svg)](${runUrl})`
		} else if (embedStyle === 'reStructuredText') {
			embedCode = `.. image:: https://svc.runme.io/static/button.svg\n    :target: ${runUrl}`
		}
	}
</script>

<MainLayout {showRunmeFooter} showTechnologyIcons={true} title="Run your application from any public Git-repo with one click">
	<div class="generator-page">
		<h1>Generate <RunmeButton/>  button for your repo.</h1>
		<section class="generator">
			<GenerateForm on:generate={event => showEmbedCode(event.detail)} />

			<div class="requirements">
				<h3><div class="requirements__icon"><Icon icon={faExclamationCircle} /></div> Requirements</h3>
				<p>In order to run your application properly, there should be at least one requirement applied to your repository. See <a href="/how-it-works">this</a> page for more information.</p>
				<ul>
					<li>your repo has a Dockerfile in the root directory</li>
					<li>your repo has a package.json with 3 main commands <code>npm install</code>, <code>npm run build</code> and <code>npm run start</code></li>
				</ul>
			</div>

			{#if canShowEmbed}
				<div class="embed-result">
					<div class="generated-embed-code">
						<TextInput rows="4" controlType="textarea" label="Include this code in the Readme.md file of your GitHub repo, to make your repo runnable" value={embedCode}/>
						<div class="embed-code-options">
							<label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="markdown"/> Markdown</label>
							<label><input bind:group={embedStyle} on:change={showEmbedCode} type="radio" value="reStructuredText"/> reStructuredText</label>
						</div>
					</div>

					<h3>Your Readme.md (with <RunmeButton/> button)</h3>
					<GithubReadme/>
				</div>
			{/if}
		</section>
	</div>
</MainLayout>

<style lang="sass">
	@import '../assets/style/theme'
	@import '../assets/style/mixins'

	.generator-page
		padding-top: 6rem
		width: 75%
		margin: 0 auto

		@media screen and (max-width: 800px)
			width: 100%

		h1
			text-align: center
			font-size: 2.5rem

	.generator
		padding-top: $spacing

	.embed-result
		@include dashed-line(top)
		padding-top: 4rem
		margin-top: 3rem

		.generated-embed-code
			margin-top: 1rem

		.embed-code-options
			label
				cursor: pointer

		h3
			margin-top: 4rem
			font-weight: bold
			font-size: 2rem
			margin-bottom: 2rem

	.requirements
		margin-top: 5rem

		&__icon
			margin-right: .5rem

		h3
			font-size: 1.6rem
			display: inline-flex
			align-items: center

		p
			font-size: 1.2rem

		ul
			list-style: disc
			padding-left: 1.5rem
			margin-top: .5rem

			li
				list-style: disc
				font-size: 1.2rem

    code
        padding: .2rem .4rem
        color: #c7254e
        background-color: #f9f2f4
        border-radius: .4rem
</style>
