import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import { config as dotenvConfig} from 'dotenv';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

// TODO simplify the way of getting env vars
// setup the correct variables from the .env file for local usage
const { parsed: envVars = {} } = dotenvConfig()

// we also need to check the process env for getting the env var from a docker build command
// e.g. docker build --build-arg RUNME_API_HOST=svc.runme.io
const keys = ['RUNME_API_HOST', 'RUNME_API_SECURE', 'DEPLOYMENT_HOST', 'APPLICATION_PROJECT_ID', 'API_KEY', 'API_SECRET'];
keys.forEach(key => process.env[key] ? envVars[key] = process.env[key] : key)

const {
	RUNME_API_HOST = '$RUNME_API_HOST',
	RUNME_API_SECURE = '$RUNME_API_SECURE',
	DEPLOYMENT_HOST = '$DEPLOYMENT_HOST',
	APPLICATION_PROJECT_ID = '$APPLICATION_PROJECT_ID',
	API_KEY = '$API_KEY',
	API_SECRET = '$API_SECRET',
} = envVars

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning);

const preprocess = sveltePreprocess({
	scss: {
		includePaths: ['src'],
	},
	postcss: {
		plugins: [require('autoprefixer')],
	},
});

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
				'runme-api-host': RUNME_API_HOST,
				'runme-api-secure': RUNME_API_SECURE,
				'deployment-host': DEPLOYMENT_HOST,
				'jexia-application-project-id': APPLICATION_PROJECT_ID,
				'jexia-api-key': API_KEY,
				'jexia-api-secret': API_SECRET,
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				preprocess
			}),
			resolve({
				preferBuiltins: false,
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead'
					}]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true
			})
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
				preprocess
			}),
			resolve({
				dedupe: ['svelte']
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
			!dev && terser()
		],

		onwarn,
	}
};
