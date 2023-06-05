# Currency Converter app

Currency conversion app made with React, Tanstack Query, Styled Components, Vite, and Vercel serverless functions.

Sources data from [Czech National Bank](https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/).

You can visit the running app at https://react-currency-converter-jnv.vercel.app/

## Setup

Run `npm i`

## Usage

Start the development server with `vercel dev`

## Implementation notes

- Uses Vite instead of CRA
- Some basic tests for text parsing and conversion are included, can be run with `npm t`
- Originally I've handled data fetching via CORS proxy, but decided to move it to Vercel's serverless function (accessible at `/api/rates`)
- Dark mode is supported

<details>

<summary>Assignment</summary>

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.

   API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt

   Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/

2. Parses the downloaded data and clearly displays it to the user in the UI.

3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.

4. Commit your code throughout your work and upload the resulting codebase into a Github repo.

5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).

6. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.

</details>
