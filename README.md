# Eco-Bite

A surplus food rescue platform. Restaurants list food that would otherwise be thrown away at a discount, shoppers reserve it and collect it with a pickup code, and an admin approves the partner organisations.

## Features

**Working now**
- Partner applications for restaurants and charities (`/apply`), with admin Approve/Reject (`/admin`)
- Restaurants can post surplus food with quantity, prices, Vegan/Halal tags and an expiry time (`/add-food`)
- Dynamic expiry pricing: items get 20% off with under 2 hours left and 50% off with under 1 hour left
- Reservations that reduce stock and generate a 4-digit pickup code, with a pickup verification screen (`/verify`)
- Dietary filters, a local watchlist and a Google Map on the shopper page (`/food`)

**In progress / known limitations**
- `/food` still shows mock data and its "Reserve Now" button is not wired to the API yet
- Review and rating submission (`PUT /api/orders`) is not implemented
- Map pins are placed on a circle around a fixed centre, not at real restaurant locations
- Login is a development role picker stored in the browser. There is no real authentication, so do not put sensitive data in a public deployment

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) and React 19
- Tailwind CSS 4
- MongoDB with Mongoose 9
- Google Maps via `@react-google-maps/api`

## Project structure

```
src/
  app/
    page.js            Home page
    apply/             Partner application form
    login/             Development login (role picker)
    admin/             Approve or reject applications
    add-food/          Restaurants list surplus food
    food/              Shopper view: filters, watchlist, map
    orders/            Reservations and reviews
    verify/            Enter a pickup code
    api/               Backend routes: apply, admin, restaurants, food, reservations, orders
  components/          Navbar, FoodMap
  lib/db.js            Cached MongoDB connection
  models/              Mongoose schemas: Restaurant, Charity, FoodItem, Reservation
```

## Getting started

You need Node.js 20.9 or newer and a MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works).

```bash
git clone https://github.com/amreenhassan13/ECO-BITE_repo.git
cd ECO-BITE_repo
npm install
cp .env.example .env.local   # then fill in your values
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |

### Trying the flow

1. Go to `/apply` and submit a restaurant application.
2. Go to `/login`, choose **admin**, and approve the application on `/admin`.
3. Log in again as **restaurant**, pick your restaurant, and list food on `/add-food`.

## Deployment

Deploy on [Vercel](https://vercel.com/new) by importing the GitHub repository and adding the two environment variables above. If you use MongoDB Atlas, allow Vercel in Network Access (`0.0.0.0/0`) and add your deployed URL to the Google Maps key's allowed referrers.

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` runs the production build
- `npm run lint` runs ESLint
