import preprocess from 'svelte-preprocess';
import firebase from 'svelte-adapter-firebase';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

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
		vite: {
			resolve: {
				alias: {
					$scripts: path.resolve('./src/scripts'),
					$buttons: path.resolve('./src/lib/components/buttons'),
					$containers: path.resolve('./src/lib/components/containers'),
					$navigation: path.resolve('./src/lib/components/navigation'),
					$selects: path.resolve('./src/lib/components/selects'),
					$switches: path.resolve('./src/lib/components/switches'),
					$tabular: path.resolve('./src/lib/tabular'),
					$majorFeatures: path.resolve('./src/lib/majorFeatures')
				}
			},
			server: {
				https: true
			},
			plugins: [mkcert]
		}
	}
};

export default config;
