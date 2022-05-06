console.log('toasts.ts...');
import { toast } from '@zerodevx/svelte-toast';
import SeenToast from '$switches/SeenToast.svelte';
import { all_icons, policeCarLight } from '$classes/constants';
import { query, where, getDocs } from '@firebase/firestore';
import { toastsCollection } from '$scripts/collections';
import { myError, myLog } from '$scripts/logging';

export type myToastOptions = {
	title?: string;
	msg?: string;
	duration?: number;
	toastContainerTop?: string;
	toastColor?: string;
	toastBackground?: string;
	toastProgressBackground?: string;
	toastBoxShadow?: string;
	toastBorderRadius?: string;
	toastMsgPadding?: string;
	useSeenToastComponent?: boolean;
	localStorageKey?: string;
	textFontWeight?: string;
	toastBarLeft?: string;
	toastBarHeight?: string;
	toastBarWidth?: string;
	toastProgressBorderRadius?: string;
};

export const defaultToast = ({
	title = '',
	msg = '',
	duration = 5000,
	toastContainerTop = '21rem',
	toastColor = 'var(--background)',
	toastBackground = 'var(--accent)',
	toastProgressBackground = 'var(--text)',
	toastBoxShadow = '0 0 4px 6px hsla(0,0,0,0.4)',
	toastBorderRadius = '5vh',
	toastMsgPadding = '1.5rem 2rem',
	useSeenToastComponent = false,
	localStorageKey = 'toast',
	textFontWeight = '600',
	toastBarWidth = '90%',
	toastBarLeft = '5%',
	toastProgressBorderRadius = '5rem',
	toastBarHeight = '4px'
}: myToastOptions) => {
	const msgBuilder = `<div style="display:grid;grid-template-columns:minmax(0,auto);text-align:center;font-weight:${textFontWeight}">
						<h3>
							${title}
						</h3>
						<section style="overflow:auto;word-wrap:anywhere;">
							${msg}
						</section>
					</div>`;
	const theme = {
		'--toastContainerTop': `${toastContainerTop}`,
		'--toastColor': `${toastColor}`,
		'--toastBackground': `${toastBackground}`,
		'--toastProgressBackground': `${toastProgressBackground}`,
		'--toastBoxShadow': `${toastBoxShadow}`,
		'--toastBorderRadius': `${toastBorderRadius}`,
		'--toastMsgPadding': `${toastMsgPadding}`,
		'--toastBarLeft': `${toastBarLeft}`,
		'--toastBarWidth': `${toastBarWidth}`,
		'--toastBarHeight': `${toastBarHeight}`,
		'--toastProgressBorderRadius': `${toastProgressBorderRadius}`
	};
	let id: number;
	if (useSeenToastComponent) {
		id = toast.push(msg, {
			component: {
				src: SeenToast,
				props: { msgMarkup: msgBuilder, localStorageKey: localStorageKey }
			},
			duration: duration,
			pausable: true,
			theme: theme
		});
	} else {
		id = toast.push(msgBuilder, {
			duration: duration,
			pausable: true,
			theme: theme
		});
	}
	return id;
};

export const errorToast = (msg: string, duration = 30_000) => {
	const id = defaultToast({
		title: 'Error!',
		msg,
		duration,
		toastColor: 'white',
		toastBackground: 'darkred'
	});
	return id;
};
export const toastIt = (title: string, msg: string, useSeenToastComponent = true) => {
	const id = defaultToast({
		title,
		msg,
		duration: 200_000,
		textFontWeight: '600',
		useSeenToastComponent
	});
	return id;
};
export const errorToastIt = () =>
	errorToast(`${policeCarLight} This is a test error. Try to avoid the real thing.`);

export const getToast = async (page: string) => {
	try {
		let msg: string;
		let title: string;
		const q = query(toastsCollection, where('page', '==', page));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			msg = doc.data().message;
			title = doc.data().title;
		});
		myLog({ msg: 'got toast', icon: all_icons.bread });
		return { msg: msg, title: title };
	} catch (error) {
		myError({ location: 'toasts.ts', function_name: 'getToast', error, icon: all_icons.bread });
	}
};

console.log('toasts.ts... done');
