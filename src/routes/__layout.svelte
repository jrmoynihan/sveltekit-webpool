<script lang="ts">
	import '../app.css';
	import { userConverter } from '../scripts/converters';
	import { currentUser, userData } from '../scripts/auth';
	import { usersCollection } from '../scripts/store';
	import { doc, onSnapshot } from '@firebase/firestore';
	import Header from '$lib/header/Header.svelte';

	$: {
		if ($currentUser && userConverter) {
			const userDocRef = doc(usersCollection, $currentUser.uid);
			const unsubscribe = onSnapshot(userDocRef.withConverter(userConverter), async (querySnap) => {
				$userData = { ...querySnap.data() };
				unsubscribe(); // stop listening for user data; prevents memmory leaking
			});
		}
	}
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
