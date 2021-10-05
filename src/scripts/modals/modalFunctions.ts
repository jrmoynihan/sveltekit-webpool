import { browser } from '$app/env';

export const displayModal = (modalID: string) => {
	console.log('displaying modal id:', modalID);
	let modal: HTMLDialogElement;
	let isDialogSupported = true;

	if (browser) {
		modal = document.getElementById(`modal-${modalID}`) as HTMLDialogElement;
		if (!window.HTMLDialogElement) {
			document.body.classList.add('no-dialog');
			isDialogSupported = false;
		}
	}
	modal.classList.add('dialogOpen');

	if (isDialogSupported && modal) {
		// dialogOpen = true;
		modal.showModal();
	} else if (modal) {
		modal.setAttribute('open', '');
	}
	blurModal(modalID);
};

export const blurModal = (modalID: string) => {
	if (browser) {
		const modal = document.getElementById(`modal-${modalID}`);
		if (modal) {
			modal.blur();
		}
	}
};
export const hideModal = async (modalID: string): Promise<void> => {
	let modal: HTMLDialogElement;
	let isDialogSupported = true;
	if (browser) {
		modal = document.getElementById(`modal-${modalID}`) as HTMLDialogElement;
		if (!window.HTMLDialogElement) {
			document.body.classList.add('no-dialog');
			isDialogSupported = false;
		}
	}
	// When navigating, this needs to be removed programmatically
	modal.classList.remove('dialogOpen');

	if (isDialogSupported && modal) {
		console.log(`dialog supported. closing dialog.`);
		setTimeout(() => {
			modal.close();
		}, 300);
	} else if (modal) {
		console.log(`dialog not supported. closing dialog.`);
		setTimeout(() => {
			modal.removeAttribute('open');
		}, 300);
	}
};
export const hideThisModalDelayed = async (modal: HTMLDialogElement) => {
	console.log(`hideThisModalDelayed...`);
	modal.classList.remove('dialogOpen');
	// run the dialog close method after the CSS transition completes to avoid "snapping" the element during the transition (set timeout to 0 to observe this)
	setTimeout(() => {
		modal.close();
	}, 300);
};
export const checkForEscape = async (
	e: KeyboardEvent & { currentTarget: EventTarget & Window },
	modal: HTMLDialogElement
) => {
	if (e.key === 'Escape') {
		hideThisModalDelayed(modal);
	}
};
