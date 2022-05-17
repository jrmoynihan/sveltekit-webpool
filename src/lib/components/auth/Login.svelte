<script lang="ts">
	// TODO: Complete or abandon?

	import { firebaseAuth } from '$lib/scripts/firebase/firebase';
	import { request } from '$lib/fetch';
	import { startSignIn } from '$lib/scripts/auth/login';

	const googleLogin = async () => {
		await startSignIn('Google', true);
	};
	const facebookLogin = async () => {
		await startSignIn('Facebook', true);
	};
</script>

<style lang="scss">
</style>
