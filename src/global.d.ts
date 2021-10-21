/// <reference types="@sveltejs/kit" />
interface HTMLDialogElement extends HTMLDialogElement {
	close(returnValue?: string): void;
	show(): void;
	showModal(): void;
}
declare let HTMLDialogElement: {
	prototype: HTMLDialogElement;
	new (): HTMLDialogElement;
};
interface Window extends Window {
	HTMLDialogElement: HTMLDialogElement;
}
