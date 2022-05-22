import { browser } from '$app/env';
import { show_missing_pick_warning, override_locked_picks } from '$lib/scripts/store';
import { get } from 'svelte/store';

export const scrollToNextGame = (): void => {
	if (browser) {
		const games_without_picks = document.getElementsByClassName('game-container unselected');
		const element_to_scroll_to = games_without_picks[0];

		if (element_to_scroll_to) {
			const yOffset = -300;
			const y = element_to_scroll_to.getBoundingClientRect().top + window.scrollY + yOffset;
			scrollToTopOfElementSmoothly(y);
			show_missing_pick_warning.set(false);
		} else if (!get(override_locked_picks)) {
			scrollToTopOfElementSmoothly();
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
export const scrollToTopOfElementSmoothly = (top = 0): void => {
	if (browser) {
		window.scrollTo({ top, behavior: 'smooth' });
	}
};
