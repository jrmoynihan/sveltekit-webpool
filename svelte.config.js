import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
// import vercel from '@sveltejs/adapter-vercel';
import path, { dirname } from 'path';
import mkcert from 'vite-plugin-mkcert';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
const filepath = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');
const sassPath = `${filepath}/src/lib/styles`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			typescript: true,
			postcss: {
				plugins: [autoprefixer()]
			},
			scss: {
				prependData: `@import '${sassPath}/mixins.scss';`,
				includePaths: [sassPath]
			}
		})
	],
	experimental: {
		// useVitePreprocess: true,
		inspector: true,
		prebundleSvelteLibraries: true
	},
	compilerOptions: {
		css: false
	},
	kit: {
		// adapter: firebase(),
		adapter: adapter(),
		// adapter: vercel({}),
		vite: {
			resolve: {
				alias: {
					$scripts: path.resolve('./src/lib/scripts'),
					$buttons: path.resolve('./src/lib/components/buttons'),
					$components: path.resolve('./src/lib/components'),
					$containers: path.resolve('./src/lib/components/containers'),
					$navigation: path.resolve('./src/lib/components/navigation'),
					$selects: path.resolve('./src/lib/components/selects'),
					$switches: path.resolve('./src/lib/components/switches'),
					$tables: path.resolve('./src/lib/components/tables'),
					$images: path.resolve('./src/lib/images'),
					$majorFeatures: path.resolve('./src/lib/majorFeatures'),
					$static: path.resolve('./static/'),
					$classes: path.resolve('./src/lib/scripts/classes')
				}
			},
			ssr: {
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
