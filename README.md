# Currency Converter app

Technical task for interview process.

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

<summary>

Assignment

</summary>

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

## Currency data

From [docs](https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/):

> The first line of the file consists of the date for which the exchange rate was declared in `DD.MM.YYYY` format. After the date there are 2 spaces and a # sign together with the sequence number of the rates published within the year.
>
> Example 1st line:
>
> ```
> 03.Jan.2000 #1
> ```
>
> This line is followed by the exchange rates, with the first line consisting of a header in the following form:
>
> ```
> Country|Currency|Amount|Code|Rate
> ```
>
> The other lines contain the data themselves. Each line contains one currency. The individual figures are separated with a `|` sign; in the case of figures with a decimal part the decimal place separator is a `.` sign. Example for a specific currency:
>
> ```
> Australia|dollar|1|AUD|23.282
> ```
>
> The foreign exchange market rate data are followed by a blank line separating the data from the calculated rates (only for years 1999-2001). These start with the header:
>
> ```
> Country|Currency|Amount|Code|Rate
> ```
>
> The data themselves follow on the subsequent lines (the separator being a '|' sign).
>
> Example line of data:
>
> ```
> Belgium|frank|100|BEF|89.762
> ```
