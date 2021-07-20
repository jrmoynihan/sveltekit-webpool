import preprocess from 'svelte-preprocess';
import firebase from 'svelte-adapter-firebase';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		defaults: {
			script: 'ts',
			style: 'scss'
		},
		sourceMap: true,
		scss: {
			prependData: `@import 'src/styles/Mixins.scss';`
		}
	}),
	compilerOptions: {
		css: false
	},

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: firebase(),
		vite:
	}
};

export default config;
