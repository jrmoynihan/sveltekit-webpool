import { https, Response, logger } from 'firebase-functions';
import { updatedUser } from './users';

let sveltekitServer: (arg0: https.Request, arg1: Response<any>) => void | PromiseLike<void>;

// change to runWith({ minInstances: 1 }).https.onRequest for faster cold-starts, at a cost pf $0.62/month
exports.sveltekit = https.onRequest(async (request, response) => {
	if (!sveltekitServer) {
		logger.info('Initialising SvelteKit SSR Handler');
		sveltekitServer = require('./sveltekit/index').default;
		logger.info('SvelteKit SSR Handler initialised!');
	}
	logger.info('Requested resource: ' + request.originalUrl);
	return sveltekitServer(request, response);
});

exports.updatedUser = updatedUser;
