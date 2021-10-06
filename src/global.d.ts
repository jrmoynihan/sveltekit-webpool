/// <reference types="@sveltejs/kit" />
interface HTMLDialogElement extends HTMLDialogElement {
	close(returnValue?: string): void;
	show(): void;
	showModal(): void;
}
declare var HTMLDialogElement: {
	prototype: HTMLDialogElement;
	new (): HTMLDialogElement;
};
interface Window extends Window {
	HTMLDialogElement: HTMLDialogElement;
}
