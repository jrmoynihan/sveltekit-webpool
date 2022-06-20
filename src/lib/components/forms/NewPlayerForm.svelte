<script lang="ts">
	import AccordionDetails from '$components/containers/accordions/AccordionDetails.svelte';
	import { createNewPlayerDocument } from '$lib/scripts/auth/login';
	import { findCurrentSeason } from '$lib/scripts/schedule';
	import { savePlayerData } from '$lib/scripts/utilities/localStorage';
	import { ErrorAndToast, myLog } from '$lib/scripts/utilities/logging';
	import { createSeasonRecordForPlayer } from '$lib/scripts/weekly/seasonRecord';
	import { getPlayers } from '$lib/scripts/weekly/weeklyPlayers';
	import { all_icons } from '$scripts/classes/constants';
	import {
		current_player,
		current_season,
		current_season_year,
		firebase_user,
		selected_player,
		show_new_player_form
	} from '$scripts/store';
	import { defaultToast } from '$scripts/toasts';
	import {
		joinCollegePool,
		joinPick6Pool,
		joinPlayoffsPool,
		joinSurvivorPool,
		joinWeeklyPool
	} from '$scripts/weekly/weeklyAdmin';
	import { where } from '@firebase/firestore';
	import {
		faArrowAltCircleRight,
		faFootballBall,
		faTimesCircle
	} from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import { cubicInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import Grid from '../containers/Grid.svelte';
	import LoadingSpinner from '../misc/LoadingSpinner.svelte';
	import Modal from '../modals/Modal.svelte';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';

	export let openNewPlayerForm: () => Promise<void> = async () => {};
	export let closeNewPlayerForm: () => Promise<void> = async () => {};
	let nickname_input: HTMLInputElement = null;
	let nickname = '';
	let sanitizedNickname = '';
	let creatingNewAccount = false;
	let buttonHidden = true;
	let nicknameEntered = false;
	let typing = false;
	let totalPriceToEnter = 0;
	const alphaNumericRegex = /[^\w\s]/g;
	const nicknameLimit = 20;
	let nickname_already_exists = false;
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

	// TODO: this data should probably be queried from the database
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
			// Remove non-alphanumeric characters and trailing/preceding whitespace
			const toggledPools = await confirmToggledPools();
			myLog({
				msg: `Creating account for ${$firebase_user.displayName} (${sanitizedNickname})...`,
				icon: all_icons.football,
				additional_params: toggledPools
			});

			const { college, pick6, playoffs, survivor, weekly } = toggledPools;
			$current_player = await createNewPlayerDocument(
				$firebase_user,
				nickname,
				college,
				pick6,
				playoffs,
				survivor,
				weekly,
				totalPriceToEnter
			);
			$selected_player = $current_player;
			await savePlayerData($firebase_user);
			// Find the current season if it hasn't already been set in the store
			const season = $current_season || (await findCurrentSeason());

			// Create the necessary docs for each pool they've joined...
			// TODO: Move these to Cloud Functions triggered on new player doc creation...

			if (weekly) {
				joinWeeklyPool($selected_player, season);
			}
			if (survivor) {
				joinSurvivorPool($selected_player, season);
			}
			if (pick6) {
				joinPick6Pool($selected_player, season);
			}
			if (playoffs) {
				joinPlayoffsPool($selected_player, season);
			}
			if (college) {
				joinCollegePool($selected_player, season);
			}

			// Create season record for any type of player, since all pools will likely have seasonal record data
			await createSeasonRecordForPlayer({
				player: $current_player,
				season_year: $current_season_year
			});

			//prettier-ignore
			defaultToast({
				title: `Account Created!`,
				msg: `${$firebase_user.displayName} (${sanitizedNickname}) has joined the following pools: ${poolsWillJoinNames.join(', ')}`
			});
			//#prettier-ignore
			closeNewPlayerForm();
			setTimeout(() => (creatingNewAccount = false), 300);
		} catch (error) {
			const msg = 'We ran into an error while creating the account.';
			ErrorAndToast({ error, msg });
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

		// TODO: This could probably be written better!
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
			if (pool.toggled) {
				buttonHidden = false;
				return;
			}
		}
		buttonHidden = true;
	};
	const isNicknameAlreadyInUse = async (nickname: string) => {
		const player_constraints = [where('nickname', '==', nickname)];
		const player_doc = await getPlayers({ constraints: player_constraints });
		return player_doc.length > 0 ? true : false;
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

	async function checkForExistingNickname() {
		nicknameEntered = true;
		sanitizedNickname = nickname.trimStart().trimEnd().replace(alphaNumericRegex, '');
		nickname_already_exists = await isNicknameAlreadyInUse(sanitizedNickname);
		if (nickname_already_exists) {
			nickname_input.setCustomValidity(
				'Nickname already in use.  Please choose a different nickname'
			);
			nicknameEntered = false;
			nickname_input.focus();
		}
	}

	export const checkForEnter = (
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }
	) => {
		if (e.code === 'Enter') {
			checkForExistingNickname();
		}
	};
	$: $show_new_player_form && openNewPlayerForm() ? openNewPlayerForm() : null;
</script>

<Modal
	bind:open={openNewPlayerForm}
	bind:close={closeNewPlayerForm}
	dialog_styles={'width: min(100vw, 600px);'}
	on:close={() => ($show_new_player_form = false)}
>
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
				{:else}
					<h5 transition:slide={slideParameters}>Nickname</h5>
				{/if}
				<input
					bind:this={nickname_input}
					id="nickname"
					type="text"
					tabindex="0"
					class:nicknameEntered
					disabled={nicknameEntered}
					required
					pattern={alphaNumericRegex.source}
					bind:value={nickname}
					on:keypress={(e) => checkForEnter(e)}
					on:input={() => (nickname_already_exists = false)}
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
						on:click={checkForExistingNickname}
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

			{#if illegalCharacters}
				<span class="error two-column">{illegalCharacterMsg}</span>
			{/if}
			{#if nickname_already_exists}
				<span class="error two-column">Nickname already exists.</span>
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
					(Click a pool to learn more)
				</h5>
				{#each poolsToJoin as pool}
					<div class="accordionWrapper" transition:slide={slideParameters}>
						<AccordionDetails
							expanderIconSide={'left'}
							customContentStyles="color:var(--text); padding-top: 1rem; {pool.toggled
								? 'background-color:hsl(82,39%,30%);color:white;'
								: ''}"
							customSummaryStyles="width:100%;font-weight:bold;border:1px solid hsla(var(--text-value), 20%);{pool.toggled
								? `background-color:hsl(82,39%,30%);color:white;`
								: ``}"
							expandTitle={`${pool.name}`}
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
						</AccordionDetails>
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
</Modal>

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
		@include defaultInput;
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
		&:disabled {
			background-color: hsla(0, 0%, 100%, 10%);
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
