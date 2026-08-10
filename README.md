# Frontend

React + Vite frontend for the Credit Wallet project.

## What This UI Does

- `Login` page authenticates an existing user
- `Signup` page creates a new user and stores the returned JWT
- `Wallet` page lists currency wallets and starts Stripe checkout
- `Campaigns` page creates campaigns and funds them using campaign credits
- `Profile` page reads the authenticated user profile
- `CheckoutReturn` handles Stripe success and cancel redirects
- `Logout` route clears the stored token and returns the user to home

## Frontend Business Flow

### Login and signup

- Signup sends `full_name`, `email`, and `password`
- Login sends `email` and `password`
- Successful auth stores the JWT in `localStorage`
- Header navigation changes based on whether a token exists

### Wallet purchase flow

- Wallet page loads `/api/wallet`
- User clicks `Buy 1 credit`
- Frontend posts `currencyId` and `quantity` to `/api/stripe/checkout`
- If the backend returns a checkout URL, the browser redirects to Stripe
- After checkout, Stripe returns to `/payment/success` or `/payment/cancel`

### Campaign flow

- Campaign page loads both wallets and campaigns
- Only campaign-module wallets are used as funding currencies
- Creating a campaign sends `title`, `targetAmount`, and `currencyId`
- Funding a campaign sends both `currencyId` and `amount`

## Local Run

```bash
cd Frontend
npm install
npm run dev
```

Set `VITE_API_BASE` in `Frontend/.env` if needed. Default is:

```env
VITE_API_BASE=http://localhost:5000/api
```

## Verification

Verified on July 22, 2026:

- `npm run build` passed
- `npm run lint` passed
