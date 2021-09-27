import { firestore, logger } from 'firebase-functions';
// import * as admin from 'firebase-admin'
// admin.initializeApp()
// const db = admin.firestore()

export const updatedUser = firestore
	.document('Users/{userID}')
	.onUpdate(async (change, context) => {
		try {
			logger.info('Updating user...', context.params.userID);
			logger.info('User data before change: ', change.before.data());
			logger.info('User data after change: ', change.after.data());
			return null;
		} catch (error) {
			logger.error('Error!', error);
			return error;
		}
	});
