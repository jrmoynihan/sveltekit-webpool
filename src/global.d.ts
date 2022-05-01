// <reference types="@sveltejs/kit" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// Add the missing methods that are available on the <dialog> HTML interface (see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement)
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
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}
