import { dev } from '$app/env';
import admin from '$lib/scripts/firebase/firebase-admin';

const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week
const secure = dev ? '' : 'Secure';

export const post = async (event) => {
	const { id_token } = await event.request.json();
	try {
		const sessionCookie = await admin.auth().createSessionCookie(id_token, { expiresIn });
		return new Response(JSON.stringify({ sessionCookie }), {
			status: 200,
			headers: {
				'set-cookie': `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; ${secure}`
			}
		});
	} catch (error) {
		return {
			status: 500
		};
	}
};
