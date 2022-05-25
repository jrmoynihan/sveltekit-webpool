import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import admin from '$lib/scripts/firebase/firebase-admin';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies.userid || crypto.randomUUID();

	// console.log('handle...', event.url);
	const response = await resolve(event);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

export const getSession: GetSession = async (event) => {
	const { session } = cookie.parse(event.request.headers.get('cookie') || '');
	try {
		const claims = await admin.auth().verifySessionCookie(session);
		return {
			user: {
				exists: true,
				...claims
			}
		};
	} catch (error) {
		return {
			user: {
				exists: false
			}
		};
	}
};
