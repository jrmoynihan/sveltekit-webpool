import { toast } from '@zerodevx/svelte-toast';

export const defaultToast = (
	title: string,
	msg: string,
	duration = 5000,
	toastContainerTop = '21rem',
	toastColor = 'var(--alternate-color)',
	toastBackground = 'var(--accent-color)',
	toastProgressBackground = 'var(--main-color)',
	toastBoxShadow = '0 0 4px 6px rgba(0,0,0,0.4)',
	toastBorderRadius = '5vh',
	toastMsgPadding = '1.5rem 2rem'
) => {
	let msgBuilder = `<div style="display:grid;text-align:center;">
						<h3>
							${title}
						</h3>
						<section>
							${msg}
						</section>
					</div>`;
	toast.push(msgBuilder, {
		duration: duration,
		pausable: true,
		theme: {
			'--toastContainerTop': `${toastContainerTop}`,
			'--toastColor': `${toastColor}`,
			'--toastBackground': `${toastBackground}`,
			'--toastProgressBackground': `${toastProgressBackground}`,
			'--toastBoxShadow': `${toastBoxShadow}`,
			'--toastBorderRadius': `${toastBorderRadius}`,
			'--toastMsgPadding': `${toastMsgPadding}`
		}
	});
};

export const errorToast = (msg: string) =>
	defaultToast('Error!', msg, 30_000, undefined, 'white', 'darkred');
