<script lang="ts">
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import {
		current_picks,
		override_locked_picks,
		selected_player,
		selected_season_year,
		selected_week,
		tiebreaker_score_guess,
		use_dark_theme
	} from '$scripts/store';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import { updateDoc, type DocumentReference } from '@firebase/firestore';
	import { weeklyPickConverter, weeklyTiebreakerConverter } from '$lib/scripts/converters';
	import { ErrorAndToast, myLog } from '$lib/scripts/logging';
	import { all_icons, checkmark } from '$lib/scripts/classes/constants';
	import { defaultToast } from '$lib/scripts/toasts';
	import type { WeeklyTiebreaker } from '$lib/scripts/classes/tiebreaker';

	export let tiebreaker: WeeklyTiebreaker;
	export let upcoming_games_count = 0;

	const updateTiebreakerDoc = async (
		doc_ref: DocumentReference,
		uid: string,
		score_guess: number,
		week: number,
		season_year: number
	): Promise<void> => {
		try {
			await updateDoc(doc_ref.withConverter(weeklyTiebreakerConverter), {
				doc_ref,
				score_guess,
				uid: uid,
				season_type: 'Regular Season',
				week,
				season_year
			});
			myLog({
				msg: 'Updated/submitted tiebreaker!',
				icon: all_icons.okHand,
				additional_params: score_guess
			});
		} catch (error) {
			const msg = 'Unable to update tiebreaker. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: { score_guess, uid, doc_ref }
			});
		}
	};

	const submitPicksAndTiebreaker = async (): Promise<void> => {
		try {
			$current_picks.forEach(async (current_pick) => {
				const { doc_ref, pick } = current_pick;

				try {
					await updateDoc(doc_ref.withConverter(weeklyPickConverter), { pick });
				} catch (error) {
					const msg = 'Unable to update pick. Please see the console for more details.';
					ErrorAndToast({
						msg,
						error,
						additional_params: current_pick
					});
				}
			});
			myLog({
				msg: 'Updated/submitted picks!',
				icon: all_icons.okHand,
				additional_params: $current_picks
			});

			await updateTiebreakerDoc(
				tiebreaker.doc_ref,
				$selected_player.uid,
				$tiebreaker_score_guess,
				$selected_week,
				$selected_season_year
			);

			defaultToast({
				title: `${checkmark} Picks Submitted!`,
				msg: `You can change any game's pick prior to that game's start time.`,
				duration: 10000
			});
		} catch (error) {
			const msg = 'Unable to submit picks. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: $current_picks
			});
		}
	};
</script>

<button
	on:click={submitPicksAndTiebreaker}
	disabled={!tiebreaker}
	class="submit {$use_dark_theme ? 'dark-mode' : 'light-mode'}"
	class:invisible={$tiebreaker_score_guess < 10 ||
		$tiebreaker_score_guess === undefined ||
		$tiebreaker_score_guess === null ||
		(upcoming_games_count === 0 && !$override_locked_picks)}
	class:pulse={$tiebreaker_score_guess >= 10}
	tabindex={$tiebreaker_score_guess >= 10 ? 0 : -1}
	in:fly={{ delay: 250, duration: 200, x: 100 }}
	out:fly={{ x: 100, duration: 200 }}
>
	Submit Picks <Fa icon={faCheckCircle} size="lg" />
</button>

<style lang="scss">
	.submit {
		@include defaultTransition;
		@include styledButton;
		@include accelerate;
		gap: 0.5rem;
		align-items: center;
		align-self: center;
		padding: max(2%, 1rem);
		font-weight: bold;
		margin: unset;
		grid-area: pickCount;
		max-height: 5rem;
		&::before {
			@include defaultPseudoElement;
			z-index: var(--below);
		}
		&.dark-mode {
			@include styledButtonDark;
		}
	}
	.pulse {
		@include pulse($pulseDistance: 20px, $opacity: 80%);
	}
	.invisible {
		opacity: 0;
		pointer-events: none;
		transform: translate3d(100%, 0%, 0%);
	}
</style>
