import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
	dsn: 'https://15af3f6b1355413c9a09773ff2bea3e2@o1299503.ingest.sentry.io/6532248',
	integrations: [new BrowserTracing()],

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});
myUndefinedFunction();
