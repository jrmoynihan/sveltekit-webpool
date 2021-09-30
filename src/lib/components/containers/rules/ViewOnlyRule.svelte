<script lang="ts">
	import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { Rule } from '$scripts/classes/rules';

	export let rule: Rule;
</script>

<li class="rule-item">
	<div class="icon">
		<Fa icon={faFootballBall} />
	</div>
	&nbsp {@html rule.text}

	{#if rule.subtext}
		<ul>
			<li class="rule-item">
				<div class="icon">
					<Fa icon={faFootballBall} />
				</div>
				&nbsp {@html rule.subtext}
			</li>
		</ul>
	{/if}
</li>

<style lang="scss">
	/* Style rule items */
	li,
	ul {
		line-height: 1.6;
	}
	li {
		display: inline-block;
		padding: 0.5rem 2rem;
		text-align: start;
		// align-self: center;

		&::marker {
			color: var(--accent-color, rgb(233, 181, 99));
			font-size: 1.2em;
		}
	}
	.icon {
		display: inline-block;
		color: var(--accent-color, rgb(233, 181, 99));
	}
</style>
