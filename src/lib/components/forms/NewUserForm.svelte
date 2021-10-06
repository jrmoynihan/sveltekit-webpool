<script lang="ts">
	import { createNewUserDocument, currentUser, userData } from '$scripts/auth/auth';
	import { football, myError, myLog } from '$scripts/classes/constants';
	import { weekBoundsCollection } from '$scripts/collections';
	import { saveUserData } from '$scripts/localStorage';
	import { godSequence, godMode } from '$scripts/store';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import {
		createTiebreakersForUser,
		createWeeklyPicksForUser,
		getAllGames
	} from '$scripts/weekly/weeklyAdmin';
	import { doc } from '@firebase/firestore';
	import { faCheckCircle, faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import AccordionDetails from '../containers/AccordionDetails.svelte';
	import Grid from '../containers/Grid.svelte';
	import ModalOnly from '../modals/ModalOnly.svelte';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';

	export let modalOnlyComponent: ModalOnly;
	let nickname: string = '';
	let buttonHidden = true;
	let nicknameEntered = false;
	let typing = false;
	let totalPriceToEnter = 0;
	const alphaNumericRegex = /[^\w\s]/g;
	const nicknameLimit = 20;
	let illegalCharacters: RegExpMatchArray;
	let illegalCharacterMsg: string | string[];
	let nicknameTooLong = false;
	let poolsWillJoinNames: string[];
	let poolsWillJoin: {
		name: string;
		toggled: boolean;
		price: number;
		textAfterPrice: string;
		fieldName: string;
		description: string[];
	}[];
	let poolsToJoin = [
		{
			name: 'Weekly ATS',
			toggled: false,
			price: 50,
			textAfterPrice: 'per season',
			fieldName: 'weekly',
			description: [
				'Pick individual games against-the-spread (ATS) across each week of the regular season.',
				'Prizes awarded to the top 3 players each week.',
				'A grand prize is awarded for the top 3 players at the end of the season.'
			]
		},
		{
			name: 'Survivor',
			toggled: false,
			price: 10,
			textAfterPrice: 'per season',
			fieldName: 'survivor',
			description: [
				'Pick a team to win straight-up each week of the regular season.',
				'The only catch -- you can only pick each team once!  Stay alive and be the last player standing!'
			]
		},
		{
			name: 'Pick6',
			toggled: false,
			price: 10,
			textAfterPrice: 'per season',
			fieldName: 'pick6',
			description: [
				`NFL teams are placed into 3 groups based on their records from the previous season.`,
				`Pick 2 from each group to have the best records at the end of this season!`,
				`Prizes awarded to the top 3 players at the end of the season.`
			]
		},
		{
			name: 'College Bowls',
			toggled: false,
			price: 5,
			textAfterPrice: 'per entry',
			fieldName: 'college',
			description: ['Pick the winners of the college bowl... [Update this text]']
		},
		{
			name: 'NFL Playoffs',
			toggled: false,
			price: 5,
			textAfterPrice: 'per entry',
			fieldName: 'playoffs',
			description: [
				`Break out your "bracketology" books! Pick the NFL playoff winners who will carry you to victory!`,
				`Prizes awarded to the top 5 brackets.`
			]
		}
	];
	const createAccount = async () => {
		try {
			const sanitizedNickname = nickname.trimStart().trimEnd().replace(alphaNumericRegex, '');
			const toggledPools = await confirmToggledPools();
			myLog(
				`Creating account for ${$currentUser.displayName} (${sanitizedNickname})...`,
				null,
				football,
				toggledPools
			);
			console.log('toggledPools', toggledPools);
			await createNewUserDocument(nickname, toggledPools, totalPriceToEnter, 0);
			await saveUserData();
			// TODO: create the necessary docs for each pool they've joined...
			// may not need to await here...
			const games = await getAllGames(false);
			createWeeklyPicksForUser($userData, true, false, games);
			createTiebreakersForUser($userData);
			//prettier-ignore
			defaultToast({
				title: `Account Created!`,
				msg: `${$currentUser.displayName} (${sanitizedNickname}) has joined the following pools: ${poolsWillJoinNames.join(', ')}`
			});
			//#prettier-ignore
			modalOnlyComponent.close();
		} catch (error) {
			errorToast('We ran into an error while creating the account.');
			myError('createAccount', error);
		}
	};
	const confirmToggledPools = async () => {
		const pools = {
			college: false,
			pick6: false,
			playoffs: false,
			survivor: false,
			weekly: false
		};
		poolsToJoin.forEach((pool) => {
			if (pool.fieldName === 'college') {
				pools.college = pool.toggled;
			}
			if (pool.fieldName === 'pick6') {
				pools.pick6 = pool.toggled;
			}
			if (pool.fieldName === 'playoffs') {
				pools.playoffs = pool.toggled;
			}
			if (pool.fieldName === 'survivor') {
				pools.survivor = pool.toggled;
			}
			if (pool.fieldName === 'weekly') {
				pools.weekly = pool.toggled;
			}
		});
		return pools;
	};
	const isOneOrMorePoolsSelected = async () => {
		for (const pool of poolsToJoin) {
			// console.log(`${pool.name} is ${pool.toggled ? 'toggled' : 'not toggled'}`);
			if (pool.toggled) {
				buttonHidden = false;
				return;
			}
		}
		buttonHidden = true;
	};

	$: totalPriceToEnter = poolsToJoin.reduce((previousValue, currentItem) => {
		if (currentItem.toggled) {
			return previousValue + currentItem.price;
		} else {
			return previousValue;
		}
	}, 0);
	const makeIllegalCharacterMsg = (illegalCharacters: RegExpMatchArray) => {
		if (illegalCharacters) {
			const msg = `Can't use the following characters: ${illegalCharacters}`;
			return msg;
		}
	};
	//prettier-ignore
	$: poolsWillJoinNames = poolsWillJoin.map((pool) => {return pool.name;});
	//#prettier-ignore
	$: poolsWillJoin = poolsToJoin.filter((pool) => pool.toggled === true);
	$: illegalCharacters = nickname.match(alphaNumericRegex);
	$: illegalCharacterMsg = makeIllegalCharacterMsg(illegalCharacters);
	$: nickname.length === 0 ? (nicknameEntered = false) : null;
	$: nickname.length > nicknameLimit ? (nicknameTooLong = true) : (nicknameTooLong = false);
	$: {
		if (typing) {
			setTimeout(() => {
				typing = false;
			}, 1250);
		}
	}
	$: setTimeout(() => {
		if (nickname.length >= 3 && !typing) {
			//TODO add a check to see if the user nickname is already in use?  Could try here or on submission.
			nicknameEntered = true;
		} else {
			nicknameEntered = false;
		}
	}, 1250);

	//possible TODO
	const getWeeklyCutoffDate = async (currentYear: number) => {
		const boundDoc = doc(weekBoundsCollection, currentYear.toString());
	};
	onMount(() => {
		$godMode = false;
		// const currentYear = new Date().getFullYear();
		// weeklyCutoffDate = await getWeeklyCutoffDate(currentYear)
	});

	export const enableGodMode = async (
		e: KeyboardEvent & { currentTarget: EventTarget & Window }
	) => {
		// console.log(e.key);
		const secretCode = ['G', 'O', 'D'];
		if (!$godMode && $userData.admin) {
			if (
				e.key !== 'G' &&
				e.key !== 'g' &&
				e.key !== 'O' &&
				e.key !== 'o' &&
				e.key !== 'D' &&
				e.key !== 'd'
			) {
				$godMode = false;
				$godSequence = [];
				console.log('an incorrect character', $godSequence);
				return;
			}
			if (e.key === 'G' || e.key === 'g') {
				$godSequence.push('G');
			}
			if (e.key === 'O' || e.key === 'o') {
				$godSequence.push('O');
			}
			if (e.key === 'D' || e.key === 'd') {
				$godSequence.push('D');
			}
			// console.log($godSequence);
			if (
				$godSequence.length === 3 &&
				$godSequence.every((letter, index) => {
					// console.log(secretCode[index]);
					if (secretCode[index] === undefined) {
						return false;
					} else {
						return letter === secretCode[index];
					}
				})
			) {
				$godMode = true;
			} else {
				$godMode = false;
			}
		}
	};
</script>

<svelte:window
	on:keydown={(e) => {
		enableGodMode(e);
	}}
/>
<ModalOnly bind:this={modalOnlyComponent} modalForegroundStyles={'width: min(100vw, 500px);'}>
	<input type="text" placeholder="test" />
	<Grid
		slot="modal-content"
		customStyles="grid-template-columns: minmax(0,1fr) minmax(0,auto); gap: 1.5rem;width:clamp(200px,85vw,100%)"
	>
		<label for="nickname" class="two-column">
			{#if !nicknameEntered}
				<h3 transition:slide={{ duration: 500 }}>Enter Your Nickname</h3>
			{/if}
			<input
				id="nickname"
				type="text"
				tabindex="0"
				bind:value={nickname}
				on:input|self|capture={(e) => console.log(e)}
			/>

			<!--TODO: could check for already used nickname here too-->
			{#if nicknameEntered && !nicknameTooLong && !illegalCharacters}
				<div class="checkmark-wrapper">
					<Fa icon={faCheckCircle} size="lg" color="green" />
				</div>
			{/if}
		</label>
		{#if illegalCharacters}
			<span class="error two-column">{illegalCharacterMsg}</span>
		{/if}
		{#if nicknameTooLong}
			<span class="error two-column"
				>Try a shorter name? We're not looking for your life story!</span
			>
		{/if}
		{#if nickname.length === 0}
			<sub>we encourage humorous names</sub>
		{/if}
		{#if nicknameEntered && !typing && !nicknameTooLong && !illegalCharacters}
			<h3 class="two-column" transition:slide={{ duration: 500 }}>Pick Your Pools</h3>
			<h5 class="reveal two-column" transition:slide={{ duration: 500 }}>
				Click to show/hide pool descriptions
			</h5>
			{#each poolsToJoin as pool, i}
				<div class="accordionWrapper" transition:slide={{ duration: 500 }}>
					<AccordionDetails
						showArrow={false}
						customContentStyles="max-width:50ch;"
						customDetailsStyles="max-width:50ch;transition:background 300ms ease-out;{pool.toggled
							? `background:darkolivegreen;color:white;`
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
							<p class="price">(${pool.price} {pool.textAfterPrice})</p>
						</svelte:fragment>
					</AccordionDetails>
				</div>
				<div class="toggle-slide" transition:slide={{ duration: 500 }}>
					<ToggleSwitch
						bgColorHue={82}
						bgColorSaturation={39}
						bgColorLuminosity={30}
						bind:checked={pool.toggled}
						on:toggle={isOneOrMorePoolsSelected}
					/>
				</div>
			{/each}
		{/if}
		{#if !buttonHidden && nicknameEntered && !illegalCharacters}
			<span transition:slide={{ duration: 500 }} class="two-column">
				${totalPriceToEnter} total to enter
			</span>
			<button
				transition:slide={{ duration: 500 }}
				disabled={buttonHidden}
				tabindex={buttonHidden ? -1 : 0}
				class="two-column"
				class:buttonHidden
				on:click={createAccount}
			>
				Create Account
			</button>
		{/if}
	</Grid>
</ModalOnly>

<style lang="scss">
	h3 {
		font-size: 1.5rem;
	}
	sub {
		font-size: x-small;
		font-style: italic;
	}
	.checkmark-wrapper {
		position: absolute;
		right: 1.5%;
		bottom: 15%;
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
		font-size: 1rem;
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
	.error {
		color: salmon;
		font-size: 1rem;
	}
</style>
