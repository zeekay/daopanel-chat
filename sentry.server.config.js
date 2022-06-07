import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_GIT_COMMIT_REF,
  tracesSampleRate: 1.0,
});
