# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## App Structure Conventions

Use these conventions for files inside `app/`:

- `components/` stores UI components.
- `components/ui/` stores shared UI components and primitives (`U` + PascalCase).
- `components/<page>/` stores page-specific sections (`EventsAbout`, `StudioClients`).
- `features/` stores reusable feature blocks and flows.
- `composables/` stores all `useXxx.ts` composables.
- `composables/data/` stores data-access composables (Strapi/BFF calls).
- `composables/pages/` stores page view-model composables.
- `types/` stores shared DTO/types and `*.types.ts`.
- `content/` stores static content JSON/TS files.

Naming rules:

- Shared Vue components: `U` + PascalCase (`UHero.vue`, `UFooter.vue`).
- Page sections: `<Page><Section>.vue` (`EventsAbout.vue`).
- Composables: `useXxx.ts` only.
- Domain constants must use domain names (for example `navigation/menu.ts`, not `const.ts`).
- Use a single import style: `~/...` paths only.
