<script>
	import RunmeButton from '../components/Runme/RunmeButton.svelte'
	import OptionEnvVars from '../components/Runme/Generator/OptionEnvVars.svelte'
	import { application } from './../components/Stores/Application'
	import MainLayout from '../components/UI/Layout/MainLayout.svelte'
	import Icon from 'fa-svelte'
	import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown'
	import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp'
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'
	import GenerateButton from '../components/Runme/Generator/GenerateButton.svelte'
	import TextInput from '../components/UI/TextInput.svelte'
	import { isDockerUrl, isEmpty, isGitUrl, queryParam, parseGitUrl, setUrl } from '../Helpers'
	import Alert from '../components/UI/Alert.svelte'
	import GithubReadme from '../components/UI/GitHub/GithubReadme.svelte'
	import { onDestroy } from 'svelte'

	// form fields
	let embedStyle = 'markdown'
	let repoUrl = ''
	let repoUrlParsed = ''
	let repoBranch = 'master'
	let dockerImage = ''
	let envVars = {}

	// form states
	let repoUrlValid
	let repoBranchValid
	let dockerImageValid
	let formIsValid

	// others
	let showAdvancedOptions = false
	let embedCode = ''
	let dropDownIcon = faSortDown
	let canShowEmbed = false
	let loading = false
	let buttonText = 'Generate'
	let errorMsg = ''
	let appId = ''
	let errorType = 'warning'
	let envVarsValid = true // true by default as this is optional
	let showRunmeFooter = false

	const exclamationIcon = faExclamationCircle

	// ensure correct GIT url
	$: parseGitUrl(repoUrl).then(url => repoUrlParsed = url)

	// check if the fields are valid
	$: repoUrlValid = !isEmpty(repoUrlParsed) && isGitUrl(repoUrlParsed)
	$: repoBranchValid = repoBranch !== ''
	$: dockerImageValid = dockerImage === '' || isDockerUrl(dockerImage)
	$: formIsValid = repoUrlValid && dockerImageValid && envVarsValid

	const setError = (error, type = 'warning') => {
		errorType = type
		errorMsg = error
	}

	const clearError = () => {
		queryParam().clear('error')
		setError('')
	}

	// check if we have to deal with an error from a previous page
	const hasError = queryParam().get('error')
	if (hasError) {
		setError(hasError, 'danger')
	}

	const isLoading = (status) => {
		if (status) {
			loading = true
			formIsValid = false
			buttonText = 'Generating...'
		} else {
			loading = false
			formIsValid = repoUrlValid
			buttonText = 'Generate'
		}
	}

	const unsubscribe = application.subscribe(({ id, error }) => {
		if (error) {
			console.log(error)
			setError('There is a problem with creating your button. Please try again later')
			isLoading(false)
		}

		if (id) {
			appId = id
			isLoading(false)
			showEmbedCode()
		}
	})

	function toggleAdvanced () {
		showAdvancedOptions = !showAdvancedOptions
		dropDownIcon = showAdvancedOptions ? faSortDown : faSortUp
	}

	function generateEmbedCode () {
		// set the button to loading
		isLoading(true)

		// clear previous errors
		clearError()

		// create an application and assign it to the store
		application.create(repoUrlParsed, repoBranch, dockerImage, envVars)
	}

	function showEmbedCode () {
		// Global statement: we need this var evaluation also in our template
		canShowEmbed = repoUrl !== '' && repoBranch !== '' && appId !== ''

		// show the footer
		showRunmeFooter = true

		const runUrl = setUrl(`run?app_id=${appId}`)

		if (canShowEmbed && embedStyle === 'markdown') {
			embedCode = `[![Runme](https://svc.runme.io/static/button.svg)](${runUrl})`
		} else if (canShowEmbed && embedStyle === 'reStructuredText') {
			embedCode = `.. image:: https://svc.runme.io/static/button.svg\n    :target: ${runUrl}`
		}
	}

	onDestroy(unsubscribe)
</script>

<MainLayout {showRunmeFooter} showTechnologyIcons={true} title="Run your application from any public Git-repo with one click">
	<div class="generator-page">
		<h1>Generate <RunmeButton/>  button for your repo.</h1>
		<section class="generator">
			{#if errorMsg}<Alert type={errorType}>{errorMsg}</Alert>{/if}

			<div id="repo-url">
				<TextInput
					id="repo-url"
					label="Copy your repo URL below."
					valid={repoUrlValid}
					validityMessage="Please enter a valid Repository url."
					value={repoUrl}
					placeholder="https://github.com/jexia/test-node-app.git"
					on:enter={generateEmbedCode}
					on:input={event => (repoUrl = event.target.value)}
				/>
			</div>

			<div id="advanced-options">
				<div class="advanced-option" on:click={toggleAdvanced}>Advanced options <Icon icon={dropDownIcon}/></div>
				{#if showAdvancedOptions}
					<div class="spacing-top">
						<TextInput
							id="repo-branch"
							label="What branch should we use?"
							valid={repoBranchValid}
							validityMessage="Please enter a valid branch."
							value={repoBranch}
							placeholder="master"
							on:input={event => (repoBranch = event.target.value)}
						/>
						<TextInput
							id="docker-image"
							label="Copy your docker image in format <image>:<tag> (optional)"
							valid={dockerImageValid}
							validityMessage="Please enter a valid Docker image url."
							value={dockerImage}
							placeholder="<image>:<tag>"
							on:enter={generateEmbedCode}
							on:input={event => (dockerImage = event.target.value)}
						/>
						<OptionEnvVars on:items={event => envVars = event.detail} on:valid={event => envVarsValid = event.detail} />
					</div>
				{/if}
			</div>

			<div class="generate-button">
				<GenerateButton {loading} disabled={!formIsValid} on:click={generateEmbedCode}>{buttonText}</GenerateButton>
			</div>

			<div class="requirements">
				<h3><div class="requirements__icon"><Icon icon={exclamationIcon} /></div> Requirements</h3>
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

	.spacing-top
		padding-top: 2rem

	.advanced-option
		font-size: 1.2rem
		cursor: pointer

	.advanced-option :global(.fa-svelte)
		width: 1rem

	.generate-button
		text-align: center

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
			height: 1em

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
</style>
