# Contact email setup

The contact form sends mail through Gmail SMTP from the Node server. SMTP credentials are server-only and are never included in the Vite bundle.

## Local setup

1. Turn on 2-Step Verification for `buildcoreconstructions@gmail.com`.
2. Create a Google **App Password** for this website. Do not use the normal Gmail password.
3. Copy `.env.example` to `.env` and set `SMTP_PASS` to the 16-character app password.
4. Keep `SMTP_USER` and `CONTACT_EMAIL` set to `buildcoreconstructions@gmail.com`.
5. Run `npm run dev`. Vite proxies `/api` requests to the mail server on port 3001.

The form sends two messages for each valid submission: the full enquiry to `CONTACT_EMAIL` and a confirmation to the user's email address. The server validates fields, ignores honeypot submissions, and limits each IP to five submissions per ten minutes.

## Deployment

This repository is configured for Vercel. The frontend is built from `client/` into
`client/dist`, and `/api/contact` is deployed as a Vercel Node function using the
same handler as the local server. Add the variables from `.env.example` to the
Vercel project environment, set `ALLOWED_ORIGIN` to the exact public HTTPS
origin of the frontend, and deploy.

For another host, deploy the Vite frontend and Node server together (or
configure the host to proxy `/api` to the Node server). Set the same variables
from `.env.example` in the hosting provider's server environment, then run
`npm run build` and start the server with `npm run server`.

Never commit `.env` or an app password. Gmail SMTP may require a verified sender/domain or provider-specific SMTP restrictions in production.
