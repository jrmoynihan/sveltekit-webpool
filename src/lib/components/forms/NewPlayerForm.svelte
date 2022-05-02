<script lang="ts">
	import { createNewPlayerDocument } from '$scripts/auth/auth';
	import { football, myError, myLog } from '$scripts/classes/constants';
	import { weekBoundsCollection } from '$scripts/collections';
	import { savePlayerData } from '$scripts/localStorage';
	import { godSequence, godMode, firebase_user, playerData } from '$scripts/store';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import {
		createTiebreakersForPlayer,
		createWeeklyPicksForPlayer,
		getAllGames
	} from '$scripts/weekly/weeklyAdmin';
	import { doc } from 'firebase/firestore';
	import {
		faArrowAltCircleRight,
		faFootballBall,
		faTimesCircle
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { fly, slide } from 'svelte/transition';
	import Grid from '../containers/Grid.svelte';
	import LoadingSpinner from '../misc/LoadingSpinner.svelte';
	import ModalOnly from '../modals/Modal.svelte';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';
	import { cubicInOut } from 'svelte/easing';
	import AccordionDetails3 from '../containers/accordions/AccordionDetails3.svelte';

	export let modalOnlyComponent: ModalOnly;
	let nickname = '';
	let creatingNewAccount = false;
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

	// TODO: this data should be queried from the database
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
	let slideParameters = { easing: cubicInOut, duration: 500 };
	const createAccount = async () => {
		try {
			const sanitizedNickname = nickname.trimStart().trimEnd().replace(alphaNumericRegex, '');
			const toggledPools = await confirmToggledPools();
			myLog(
				`Creating account for ${$firebase_user.displayName} (${sanitizedNickname})...`,
				null,
				football,
				toggledPools
			);
			console.log('toggledPools', toggledPools);
			// for await (const i of Array(100000).keys()) {
			// 	const remainder = i % 10;
			// 	if (remainder === 0) {
			// 		// console.log(i);
			// 		debugCounter = i;
			// 	}
			// }
			await createNewPlayerDocument($firebase_user, nickname, toggledPools, totalPriceToEnter, 0);
			await savePlayerData($firebase_user);
			// TODO: create the necessary docs for each pool they've joined...
			// may not need to await here, but should instead use Workers!
			const games = await getAllGames(false);
			createWeeklyPicksForPlayer($playerData, true, false, games);
			createTiebreakersForPlayer($playerData);
			//prettier-ignore
			defaultToast({
				title: `Account Created!`,
				msg: `${$firebase_user.displayName} (${sanitizedNickname}) has joined the following pools: ${poolsWillJoinNames.join(', ')}`
			});
			//#prettier-ignore
			modalOnlyComponent.close();
			setTimeout(() => (creatingNewAccount = false), 300);
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

	// $: {
	// 	if (typing) {
	// 		setTimeout(() => {
	// 			typing = false;
	// 		}, 1250);
	// 	}
	// }
	// $: setTimeout(() => {
	// 	if (nickname.length >= 3 && !typing) {
	// 		//TODO add a check to see if the user nickname is already in use?  Could try here or on submission.
	// 		nicknameEntered = true;
	// 	} else {
	// 		nicknameEntered = false;
	// 	}
	// }, 1250);

	//possible TODO
	const getWeeklyCutoffDate = async (currentYear: number) => {
		const boundDoc = doc(weekBoundsCollection, currentYear.toString());
	};
	onMount(() => {
		$godMode = false;
		// possible TODO
		// const currentYear = new Date().getFullYear();
		// weeklyCutoffDate = await getWeeklyCutoffDate(currentYear)
	});

	export const enableGodMode = async (
		e: KeyboardEvent & { currentTarget: EventTarget & Window }
	) => {
		// console.log(e.key);
		const secretCode = ['G', 'O', 'D'];
		if (!$godMode && $playerData?.admin) {
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
				// console.log('an incorrect character', $godSequence);
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
	export const checkForEnter = (
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		if (e.code === 'Enter') {
			console.log('pressed Enter');
			nicknameEntered = true;
		}
	};
</script>

<svelte:window
	on:keydown={(e) => {
		enableGodMode(e);
	}}
/>

<ModalOnly bind:this={modalOnlyComponent} dialogStyles={'width: min(100vw, 600px);'}>
	<input type="text" placeholder="test" />
	<Grid
		slot="modal-content"
		customStyles="grid-template-columns: minmax(0,1fr) minmax(0,auto); gap: 1.5rem;width:clamp(200px,85vw,100%); overflow: hidden;
		padding: 1rem;"
	>
		{#if !creatingNewAccount}
			<!-- <div class="nickname-grid "> -->
			<label for="nickname" class="two-column">
				{#if !nicknameEntered}
					<h3 transition:slide={slideParameters}>Enter Your Nickname</h3>
				{/if}
				<input
					id="nickname"
					type="text"
					tabindex="0"
					class:nicknameEntered
					disabled={nicknameEntered}
					bind:value={nickname}
					on:keypress={(e) => checkForEnter(e)}
				/>

				<!--TODO: could check for already used nickname here too-->
				<!-- {#if !nicknameTooLong && !illegalCharacters}
					<div class="checkmark-wrapper">
						<Fa icon={faCheckCircle} size="lg" color="green" />
					</div>
					{/if} -->
				{#if nickname.length >= 3 && !nicknameTooLong && !illegalCharacters && !nicknameEntered}
					<button
						class="continue-button"
						transition:fly={{ duration: 500, x: 100 }}
						on:click={() => (nicknameEntered = true)}
						><Fa icon={faArrowAltCircleRight} size="lg" /></button
					>
				{:else if nicknameEntered}
					<button
						class="continue-button"
						transition:fly={{ duration: 500, x: -100 }}
						on:click={() => (nicknameEntered = false)}><Fa icon={faTimesCircle} size="lg" /></button
					>
				{/if}
			</label>

			<!-- </div> -->
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
				<h3 class="two-column" transition:slide={slideParameters}>Pick Your Pools</h3>
				<h5 class="reveal two-column" transition:slide={slideParameters}>
					Click to show/hide pool descriptions
				</h5>
				{#each poolsToJoin as pool}
					<div class="accordionWrapper" transition:slide={slideParameters}>
						<AccordionDetails3
							showArrow={true}
							customContentStyles="color:var(--text); {pool.toggled
								? 'background-color:hsl(82,39%,30%);color:white;'
								: ''}"
							customSummaryStyles="width:100%;font-weight:bold;{pool.toggled
								? `background-color:hsl(82,39%,30%);color:white;`
								: ``}"
							expandTitle={pool.name}
							{slideParameters}
						>
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
						</AccordionDetails3>
					</div>
					<div class="toggle-slide" transition:slide={slideParameters}>
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
				{#key totalPriceToEnter}
					<span
						class:hidden={buttonHidden || !nicknameEntered || illegalCharacters}
						in:fly={{ x: 100, duration: 200 }}
						class="two-column price"
					>
						${totalPriceToEnter} total to enter
					</span>
				{/key}
				<button
					transition:slide={slideParameters}
					disabled={buttonHidden}
					tabindex={buttonHidden ? -1 : 0}
					class:hidden={buttonHidden || !nicknameEntered || illegalCharacters}
					class="two-column"
					on:click={() => {
						creatingNewAccount = true;
						setTimeout(async () => await createAccount(), 1500);
					}}
				>
					Create Account
				</button>
			{/if}
		{:else}
			<LoadingSpinner msg={`Creating New Account...`}>
				<!-- <svelte:fragment slot="content">
					<h1 transition:slide={{ duration: 500 }}>{}</h1>
				</svelte:fragment> -->
			</LoadingSpinner>
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
	.price {
		font-weight: bold;
	}
	.icon {
		display: inline-block;
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
			color: var(--accent, hsl(37, 75%, 65%));
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
		@include cloudyBackground;
		background-color: white;
		text-align: center;
		font-size: inherit;
		font-weight: revert;
		margin-top: 1rem;
		width: 100%;
		height: 3rem;
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
	.continue-button {
		@include absolute($right: -2px, $bottom: 0px);
		box-sizing: border-box;
		width: min-content;
		height: min-content;
		color: var(--background);
		padding: 0.5rem;
	}
	.price {
		@include pulse($iterationCount: 2, $opacity: 100%, $duration: 2s, $delay: 500ms);
		@include rounded;
		@include centerAIJC;
		max-width: max-content;
		margin: auto;
		padding: 0.5rem 1rem;
	}
	.nicknameEntered {
		background: inherit;
		color: var(--text);
		border: 1px inset;
		&:hover {
			cursor: inherit;
		}
	}
	.hidden {
		opacity: 0;
		pointer-events: none;
		animation: none;
		box-shadow: none;
		appearance: none;
		transition: all 400ms ease-in-out;
	}
</style>
