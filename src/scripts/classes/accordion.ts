export class Accordion {
	el: HTMLDetailsElement;
	summary: HTMLElement;
	content: HTMLElement;
	animation: Animation;
	isClosing: boolean;
	isExpanding: boolean;
	open: boolean;
	userAppliedOverflowYStyle: string;
	userAppliedOverflowXStyle: string;

	constructor(
		element: HTMLDetailsElement,
		expandDuration: string | number = 300,
		overflow_Y?: string,
		overflow_X?: string
	) {
		// Store the <details> element
		this.el = element;
		// Store the <summary> element
		this.summary = element.querySelector('summary');
		// Store the <div class="content"> element
		this.content = element.querySelector('.content');
		// Store any user-applied overflow styling
		this.userAppliedOverflowXStyle = overflow_X;
		this.userAppliedOverflowYStyle = overflow_Y;

		// Store the animation object (so we can cancel it if needed)
		this.animation = null;
		// Store if the element is closing
		this.isClosing = false;
		// Store if the element is expanding
		this.isExpanding = false;
		// Detect user clicks on the summary element
		this.summary.addEventListener('click', (e) => this.onClick(e, expandDuration));
	}

	onClick(e: MouseEvent, expandDuration: string | number) {
		// Stop default behaviour from the browser
		e.preventDefault();
		// Add an overflow on the <details> to avoid content overflowing
		this.el.style.overflow = 'hidden';
		// Check if the element is being closed or is already closed
		if (this.isClosing || !this.el.open) {
			this.openAccordion(expandDuration);
			// Check if the element is being openned or is already open
		} else if (this.isExpanding || this.el.open) {
			this.shrink(expandDuration);
		}
	}

	shrink(expandDuration: number | string): void {
		// Set the element as "being closed"
		this.isClosing = true;

		// Add an overflow on the <details> to avoid content overflowing
		this.el.style.overflow = 'hidden';

		// Store the current height of the element
		const startHeight = `${this.el.offsetHeight}px`;
		// Calculate the height of the summary
		const endHeight = `${this.summary.offsetHeight}px`;

		// If there is already an animation running
		if (this.animation) {
			// Cancel the current animation
			this.animation.cancel();
		}

		// Start a WAAPI animation
		this.animation = this.el.animate(
			{
				// Set the keyframes from the startHeight to endHeight
				height: [startHeight, endHeight]
			},
			{
				duration: expandDuration,
				easing: 'ease-out'
			}
		);

		// When the animation is complete, call onAnimationFinish()
		this.animation.onfinish = () => this.onAnimationFinish(false);
		// If the animation is cancelled, isClosing variable is set to false
		this.animation.oncancel = () => (this.isClosing = false);
	}

	openAccordion(expandDuration: number | string) {
		// Apply a fixed height on the element
		this.el.style.height = `${this.el.offsetHeight}px`;
		// Force the [open] attribute on the details element
		this.el.open = true;
		// Wait for the next frame to call the expand function
		window.requestAnimationFrame(() => this.expand(expandDuration));
	}

	expand(expandDuration: number | string) {
		// Set the element as "being expanding"
		this.isExpanding = true;
		// Get the current fixed height of the element
		const startHeight = `${this.el.offsetHeight}px`;
		// Calculate the open height of the element (summary height + content height)
		const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

		// If there is already an animation running
		if (this.animation) {
			// Cancel the current animation
			this.animation.cancel();
		}

		// Start a WAAPI animation
		this.animation = this.el.animate(
			{
				// Set the keyframes from the startHeight to endHeight
				height: [startHeight, endHeight]
			},
			{
				duration: expandDuration,
				easing: 'ease-out'
			}
		);
		// When the animation is complete, call onAnimationFinish()
		this.animation.onfinish = () => this.onAnimationFinish(true);
		// If the animation is cancelled, isExpanding variable is set to false
		this.animation.oncancel = () => (this.isExpanding = false);
	}

	onAnimationFinish(open: boolean) {
		// Set the open attribute based on the parameter
		this.el.open = open;
		// Clear the stored animation
		this.animation = null;
		// Reset isClosing & isExpanding
		this.isClosing = false;
		this.isExpanding = false;
		// Remove the overflow hidden and the fixed height
		this.el.style.height = '';
		this.el.style.overflowY = this.userAppliedOverflowYStyle;
		this.el.style.overflowX = this.userAppliedOverflowXStyle;
	}
}
