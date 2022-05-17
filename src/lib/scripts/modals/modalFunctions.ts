import { browser } from '$app/env';

export const displayModal = async (modal: HTMLDialogElement) => {
	let isDialogSupported = true;
	if (browser && !window.HTMLDialogElement) {
		isDialogSupported = false;
	}
	modal.classList.add('dialogOpen');
	if (isDialogSupported && modal) {
		modal.showModal();
	} else if (modal) {
		modal.setAttribute('open', '');
	}
};
export const hideThisModalDelayed = async (modal: HTMLDialogElement) => {
	// console.log(`hideThisModalDelayed...`);
	modal.classList.remove('dialogOpen');
	modal.close();
};
export const checkForEscape = async (
	e: KeyboardEvent & { currentTarget: EventTarget & Window },
	modal: HTMLDialogElement
) => {
	if (e.key === 'Escape') {
		hideThisModalDelayed(modal);
	}
};
