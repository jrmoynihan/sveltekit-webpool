<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import RoleToggle from '$switches/RoleToggle.svelte';
	import AmericanFootball from '../../static/American_football.svelte';
	import { dev } from '$app/env';
	import { allTeams } from '$scripts/site';

	let drawing = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		Welcome!
		<!-- <div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>-->
	</h1>
	<AmericanFootball bind:drawing />
	{#if dev}
		<RoleToggle role="admin" />
		<RoleToggle role="college" />
		<RoleToggle role="pick6" />
		<RoleToggle role="playoffs" />
		<RoleToggle role="survivor" />
		<RoleToggle role="weekly" />
	{/if}
	<div class="team-gallery">
		{#each allTeams as team}
			<picture>
				<!-- <source srcset={team.logoPath} type="image/webp" /> -->
				<img
					src={team.logoPath}
					alt="{team.city}-{team.name}"
					width="50px"
					height="auto"
					loading="lazy"
				/>
			</picture>
			<picture>
				<!-- <source srcset={team.logoPath} type="image/webp" /> -->
				<img
					src={team.fontPath}
					alt="{team.city}-{team.name}"
					width="100px"
					height="auto"
					loading="lazy"
				/>
			</picture>
		{/each}
	</div>
</section>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	section {
		@include frostedGlass;
		@include rounded;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(0, auto));
		justify-items: center;
		justify-content: center;
		align-items: center;
		max-height: 100%;
		overflow: auto;
	}

	h1 {
		width: 100%;
	}
	.team-gallery {
		box-sizing: border-box;
		display: grid;
		grid-column: span 2;
		grid-template-columns: 1fr 1fr;
		margin: 1rem;
		padding: 1rem;
		width: 100%;
	}
	picture {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
