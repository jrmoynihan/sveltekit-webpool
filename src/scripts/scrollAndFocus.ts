import { browser } from '$app/env';
import type { WeeklyPickDoc } from './classes/picks';
import { isBeforeGameTime } from './functions';
import { showPickWarning, overrideDisabled } from '$scripts/store';
import { get } from 'svelte/store';

export const scrollToNextGame = (
	index: number,
	currentPickCount: number,
	upcomingGameCount: number
): void => {
	if (browser) {
		const element = document.getElementById(`game-${index + 1}`);

		// NOTE: The minus 1 accounts for this function running before the parent passes in the newly updated currentPickCount
		// I.E. -- When making the 16th pick, currentPickCount will still be 15
		if (currentPickCount < upcomingGameCount - 1 && element) {
			const yOffset = -300;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			scrollToTopSmooth(y);
			showPickWarning.set(false);
		} else if (!get(overrideDisabled)) {
			setTimeout(() => {
				if (currentPickCount < upcomingGameCount - 1) {
					showPickWarning.set(true);
				}
			}, 1000);
			scrollToTopSmooth();
			// focusTiebreaker();
		}
	}
};
export const focusTiebreaker = (): void => {
	if (browser) {
		setTimeout(() => {
			const tiebreakerInput = document.getElementById('tiebreaker-input');
			if (tiebreakerInput) {
				tiebreakerInput.focus();
			}
		}, 200);
	}
};
export const scrollToTopSmooth = (top = 0): void => {
	if (browser) {
		window.scrollTo({ top, behavior: 'smooth' });
	}
};

export const findMissedPick = async (currentPicks: WeeklyPickDoc[]): Promise<number> => {
	for (const [i, value] of currentPicks.entries()) {
		if (value.pick === '') {
			if (await isBeforeGameTime(value.timestamp)) {
				return i;
			}
		}
	}
};
export const goToMissedPick = async (currentPicks: WeeklyPickDoc[]): Promise<void> => {
	const pickIndex = await findMissedPick(currentPicks);
	// console.log(pickIndex);
	if (pickIndex) {
		scrollToNextGame(pickIndex - 1, 0, 2); // Force it to run the scroll to game instead of scroll to top;
	} else {
		scrollToTopSmooth();
	}
};
