<script lang="ts">
	import type { DocumentReference } from '@firebase/firestore';
	import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import type { DocumentData } from '@firebase/firestore';
	import Fa from 'svelte-fa';

	export let rule: { data: DocumentData; ref: DocumentReference };

	let ruleData = { ...rule.data };
</script>

<li class="rule-item">
	<div class="icon">
		<Fa icon={faFootballBall} />
	</div>
	&nbsp {@html ruleData.text}

	{#if ruleData.subtext}
		<ul>
			<li class="rule-item">
				<div class="icon">
					<Fa icon={faFootballBall} />
				</div>
				&nbsp {@html ruleData.subtext}
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

		&::marker {
			color: var(--accent-color);
			font-size: 1.2em;
		}
	}
	.icon {
		display: inline-block;
		color: var(--accent-color);
	}
</style>
