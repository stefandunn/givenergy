# GivEnergy Auto-Eco Moder

This is a [NextJS](https://nextjs.org/) project used to create a cron-job which will automatically set your "Eco" (or "Dynamic") mode to `true` when outside of scheduled discharge or imports.

The intention is to have this hosted on Vercel.

## Getting Started

1. Run `yarn install`
2. Copy `.env.example` to `env.local` and fill in the details. You can obtain an [API key here](https://givenergy.cloud/account-settings/security).
3. [Get ahold of the setting IDs](https://givenergy.cloud/docs/api/v1#inverter-control-GETinverter--inverter_serial_number--settings) by first querying the API through Postman.
4. Set the IDs of each setting in the `.env.local` file.
5. You can run `yarn dev` and go to [localhost:3000/api/cron/reset-to-dynamic](http://localhost:3000/api/cron/reset-to-dynamic) to test it out.

## Host on Vercel

Once this repo has been forked, you can host the app on [Vercel](https://vercel.com/). The repo is set up to automatically set the cron-job to run every minute.
