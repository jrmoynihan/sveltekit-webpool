import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
// import firebase from 'svelte-adapter-firebase';
import path, { dirname } from 'path';
import mkcert from 'vite-plugin-mkcert';
import { fileURLToPath } from 'url';
const filepath = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');
const sassPath = `${filepath}/src/styles`;
// import { imagetools } from 'vite-imagetools';
// import autoprefixer from 'autoprefixer';

// SASS solution via Scott Tolinski: https://www.reddit.com/r/sveltejs/comments/pmham1/sveltekit_how_to_set_up_global_scss_accessible_to/

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: `@import '${sassPath}/mixins.scss';`
			}
		})
	],
	experimental: { useVitePreProcess: true },
	compilerOptions: {
		css: false
	},

	kit: {
		// adapter: firebase(),
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$scripts: path.resolve('./src/scripts'),
					$buttons: path.resolve('./src/lib/components/buttons'),
					$components: path.resolve('./src/lib/components'),
					$containers: path.resolve('./src/lib/components/containers'),
					$navigation: path.resolve('./src/lib/components/navigation'),
					$selects: path.resolve('./src/lib/components/selects'),
					$switches: path.resolve('./src/lib/components/switches'),
					$tables: path.resolve('./src/lib/components/tables'),
					$images: path.resolve('./src/lib/images'),
					$majorFeatures: path.resolve('./src/lib/majorFeatures'),
					$static: path.resolve('./static/')
				}
			},
			// build: {
			// 	target: 'esnext'
			// },
			ssr: {
				// external: ['@firebase/firestore']
				external: ['whatwg-url']
			},
			server: {
				https: true
			},
			plugins: [mkcert]
		}
	}
};

export default config;
