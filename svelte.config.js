import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import svelteImage from 'svelte-image';
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
		}),
		svelteImage({
			sizes: [50, 100, 200, 400, 800, 1200, 1600],
			processFolders: [
				'ARI',
				'ATL',
				'BAL',
				'BUF',
				'CAR',
				'CHI',
				'CIN',
				'CLE',
				'DAL',
				'DEN',
				'DET',
				'GB',
				'HOU',
				'IND',
				'JAX',
				'KC',
				'LAC',
				'LAR',
				'LV',
				'MIA',
				'MIN',
				'NE',
				'NO',
				'NYG',
				'NYJ',
				'PHI',
				'PIT',
				'SEA',
				'SF',
				'TB',
				'TEN',
				'WSH'
			],
			componentExtensions: ['webp', 'avif'],
			processFoldersRecursively: true,
			processFoldersExtensions: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'],
			processFoldersSizes: [50, 100, 200, 400, 800, 1200, 1600],
			outputDir: 'g/',
			placeholder: 'blur',
			webpOptions: {
				quality: 95,
				smartSubsample: true
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
