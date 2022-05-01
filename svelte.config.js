import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import firebase from 'svelte-adapter-firebase';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
// import { imagetools } from 'vite-imagetools';
// import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		// postcss: {
		// plugins: [autoprefixer()],
		// prependData: `@import('src/styles/mixins.scss', 'src/styles/functions.scss');`
		// },
		// sourceMap: true,
		scss: {
			prependData: `@import 'src/styles/mixins.scss', 'src/styles/functions.scss';`
		}
	}),
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
