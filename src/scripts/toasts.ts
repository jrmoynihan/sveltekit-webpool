import { toast } from '@zerodevx/svelte-toast';
import SeenToast from '$lib/components/switches/SeenToast.svelte';

export const defaultToast = ({
	title = '',
	msg = '',
	duration = 5000,
	toastContainerTop = '21rem',
	toastColor = 'var(--alternate-color)',
	toastBackground = 'var(--accent-color)',
	toastProgressBackground = 'var(--main-color)',
	toastBoxShadow = '0 0 4px 6px rgba(0,0,0,0.4)',
	toastBorderRadius = '5vh',
	toastMsgPadding = '1.5rem 2rem',
	useSeenToastComponent = false,
	localStorageKey = 'toast',
	textFontWeight = '600',
	toastBarWidth = '90%',
	toastBarLeft = '5%',
	toastProgressBorderRadius = '5rem',
	toastBarHeight = '4px'
}) => {
	const msgBuilder = `<div style="display:grid;text-align:center;font-weight:${textFontWeight}">
						<h3>
							${title}
						</h3>
						<section>
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
	if (useSeenToastComponent) {
		toast.push({
			component: {
				src: SeenToast,
				props: { msgMarkup: msgBuilder, localStorageKey: localStorageKey }
			},
			duration: duration,
			pausable: true,
			theme: theme
		});
	} else {
		toast.push(msgBuilder, {
			duration: duration,
			pausable: true,
			theme: theme
		});
	}
};

export const errorToast = (msg: string) =>
	defaultToast({
		title: 'Error!',
		msg,
		duration: 30_000,
		toastColor: 'white',
		toastBackground: 'darkred'
	});
