<script lang="ts">
	import { currentUser } from '$scripts/auth/auth';
	import { football, myLog } from '$scripts/classes/constants';
	import { hideModal } from '$scripts/functions';
	import { faCheckCircle, faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import AccordionDetails from '../containers/AccordionDetails.svelte';
	import Grid from '../containers/Grid.svelte';
	import ModalButtonAndSlot from '../modals/ModalButtonAndSlot.svelte';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';
	let modalID: string;
	let nickname: string = '';
	let buttonHidden = true;
	let nicknameEntered = false;
	let typing = false;
	let poolsToJoin = [
		{
			name: 'Weekly ATS',
			toggled: false,
			price: '$50 per season',
			description: [
				'Pick individual games against-the-spread (ATS) across each week of the regular season.',
				'Prizes awarded to the top 3 players each week.',
				'A grand prize is awarded for the top 3 players at the end of the season.'
			]
		},
		{
			name: 'Survivor',
			toggled: false,
			price: '$10 per season',
			description: [
				'Pick a team to win straight-up each week of the regular season.',
				'The only catch -- you can only pick each team once!  Stay alive and be the last player standing!'
			]
		},
		{
			name: 'Pick6',
			toggled: false,
			price: '$10 per season',
			description: [
				`NFL teams are placed into 3 groups based on their records from the previous season.`,
				`Pick 2 from each group to have the best records at the end of this season!`,
				`Prizes awarded to the top 3 players at the end of the season.`
			]
		},
		{
			name: 'College Bowls',
			toggled: false,
			price: '$5 per entry',
			description: ['Pick the winners of the college bowl... [Update this text]']
		},
		{
			name: 'NFL Playoffs',
			toggled: false,
			price: '$5 per entry',
			description: [
				`Break out your "bracketology" books! Pick the NFL playoff winners who will carry you to victory!`,
				`Prizes awarded to the top 5 brackets.`
			]
		}
	];
	const createAccount = async () => {
		alert('Going to create an account!');
		const sanitizedNickname = nickname.trimStart().trimEnd();
		let poolsWillJoin: string[] = [];
		poolsToJoin.forEach((pool) => {
			const report = `${pool.name}: ${pool.toggled}`;
			poolsWillJoin.push(report);
		});
		myLog(
			`Creating account for ${$currentUser.displayName} (${sanitizedNickname})...`,
			null,
			football,
			poolsWillJoin
		);
		hideModal(modalID);
	};
	const isOneOrMorePoolsSelected = async () => {
		for (const pool of poolsToJoin) {
			if (pool.toggled) {
				buttonHidden = false;
				return;
			}
		}
		buttonHidden = true;
	};

	$: setTimeout(() => {
		if (nickname.length > 3 && !typing) {
			//TODO add a check to see if the user nickname is already in use?  Could try here or on submission.
			nicknameEntered = true;
		} else {
			nicknameEntered = false;
		}
	}, 1500);

	$: setTimeout(() => {
		if (typing) {
			typing = false;
		}
	}, 750);
</script>

<ModalButtonAndSlot
	displayModalButtonText={'Show Login Form'}
	bind:modalID
	modalForegroundStyles={'width: min(100vw, 500px);'}
>
	<Grid
		slot="modal-content"
		customStyles="grid-template-columns: minmax(0,1fr) minmax(0,auto); gap: 1.5rem;width:clamp(200px,85vw,100%)"
	>
		<label for="nickname" class="two-column">
			<h3>Enter Your Nickname</h3>
			<input
				id="nickname"
				type="text"
				bind:value={nickname}
				on:input={() => {
					if (!typing) {
						typing = true;
					}
				}}
			/>
			{#if nickname.length === 0}
				<sub>we encourage humorous names</sub>
			{/if}
			<!--TODO: could check for already used nickname here too-->
			{#if nicknameEntered}
				<div class="checkmark-wrapper">
					<Fa icon={faCheckCircle} size="lg" color="green" />
				</div>
			{/if}
		</label>
		{#if nicknameEntered}
			<h3 class="two-column" transition:slide={{ duration: 500 }}>Pick Your Pools</h3>
			<h5 class="reveal two-column" transition:slide={{ duration: 500 }}>
				Click to show/hide pool descriptions
			</h5>
			{#each poolsToJoin as pool}
				<div class="accordionWrapper" transition:slide={{ duration: 500 }}>
					<AccordionDetails
						showArrow={false}
						customContentStyles="max-width:50ch;"
						customDetailsStyles="max-width:50ch;transition:background 300ms ease-out;{pool.toggled
							? `background:#2196f3;color:white;`
							: ``}"
					>
						<p slot="summary" class="summary">{pool.name}</p>
						<svelte:fragment slot="content">
							<ul>
								{#each pool.description as item}
									<li>
										<div class="icon">
											<Fa icon={faFootballBall} />
										</div>
										&nbsp
										{@html item}
									</li>
								{/each}
							</ul>
							<p class="price">({pool.price})</p>
						</svelte:fragment>
					</AccordionDetails>
				</div>
				<div class="toggle-slide" transition:slide={{ duration: 500 }}>
					<ToggleSwitch bind:checked={pool.toggled} on:toggle={isOneOrMorePoolsSelected} />
				</div>
			{/each}
		{/if}
		{#if !buttonHidden}
			<button
				transition:slide={{ duration: 500 }}
				disabled={buttonHidden}
				class="two-column"
				class:buttonHidden
				on:click={createAccount}>Create Account</button
			>
		{/if}
	</Grid>
</ModalButtonAndSlot>

<style lang="scss">
	h3 {
		font-size: 1.25rem;
	}
	sub {
		font-size: x-small;
		font-style: italic;
	}
	.checkmark-wrapper {
		position: absolute;
		right: 1.5%;
		bottom: 10%;
	}
	.price {
		font-weight: bold;
	}
	.icon {
		display: inline-block;
		// color: var(--accent-color, rgb(233, 181, 99));
	}
	.summary {
		font-weight: bold;
		font-size: 1.25rem;
	}
	ul {
		// justify-items: left;
		display: grid;
	}
	li {
		display: inline-block;
		padding: 0.5rem 2rem;
		text-align: start;

		&::marker {
			color: var(--accent-color, rgb(233, 181, 99));
			font-size: 1.2em;
		}
	}
	label {
		font-weight: bold;
		font-size: 1.25rem;
		position: relative;
	}
	input {
		@include editableInput;
		// @include cloudyBackground;
		background-color: white;
		text-align: center;
		font-size: inherit;
		font-weight: revert;
		margin-top: 1rem;
	}
	button {
		@include styledButton;
		font-weight: bold;
		font-size: 1.25rem;
	}
	.reveal {
		text-align: center;
		font-style: italic;
	}
	.two-column {
		grid-column: span 2;
	}
</style>
