# 1unicorn

Monorepo with two applications:
- `frontend` - Nuxt 4 client application
- `server` - Strapi 5 backend (CMS/API)

## Stack

- Frontend: Nuxt 4, Vue 3
- Backend: Strapi 5, SQLite (`better-sqlite3`)
- Runtime: Node.js 20+

## Project Structure

```text
1unicorn/
  frontend/    # Nuxt application
  server/      # Strapi application
```

## Requirements

- Node.js `>=20`
- npm

## Setup

Install dependencies separately in each app:

```bash
cd frontend && npm install
cd ../server && npm install
```

## Environment Variables

Create local env files from examples:

```bash
cp frontend/.env.example frontend/.env
cp server/.env.example server/.env
```

Important:
- Do not commit real `.env` files to git
- Keep only `.env.example` in repository

## Run in Development

Start backend (Strapi):

```bash
cd server
npm run dev
```

Start frontend (Nuxt) in a second terminal:

```bash
cd frontend
npm run dev
```

Optional (LAN access):

```bash
cd frontend
npm run dev:host
```

By default:
- Strapi: `http://localhost:1337`
- Nuxt: `http://localhost:3000`

## Production Build

Backend:

```bash
cd server
npm run build
npm run start
```

Frontend:

```bash
cd frontend
npm run build
npm run start
```

## Useful Scripts

Server (`server/package.json`):
- `npm run dev` - start Strapi in development
- `npm run build` - build admin panel
- `npm run start` - run Strapi in production mode
- `npm run seed:example` - run example data seed

Frontend (`frontend/package.json`):
- `npm run dev` - start Nuxt dev server
- `npm run dev:host` - start Nuxt on `0.0.0.0`
- `npm run build` - production build
- `npm run start` - run built Nuxt server

## Deploy Notes

- Frontend has `npm run deploy` script (`frontend/scripts/deploy.sh`)
- Server has `npm run deploy` script (Strapi Cloud deploy command)

Configure deploy-related variables in env files before deployment.
