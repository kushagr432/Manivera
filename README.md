# Manivera

A React application built with Vite and TypeScript.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create your environment file and fill in the values:
```bash
cp .env.example .env
```
Every credential and environment-specific URL is read from `.env` — see
`.env.example` for the documented list and `src/config/env.ts` for how the
values are consumed. `.env` is gitignored; never commit it.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`
   (the admin panel is at `/admin`, or whatever `VITE_ADMIN_BASE_PATH` is set to)

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

### Project Structure

```
manivera/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── .eslintrc.cjs
```

## Technologies Used

- React 18
- TypeScript
- Vite
- ESLint

