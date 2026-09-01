# OctoFit Tracker Frontend

This is the React 19 presentation tier for the OctoFit multi-tier application.

## Required environment variable

The app builds API URLs using `VITE_CODESPACE_NAME` when running in GitHub Codespaces.

Create a `.env.local` file with:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

If `VITE_CODESPACE_NAME` is missing, the app falls back to `http://localhost:8000` to avoid invalid URLs like `https://undefined-8000.app.github.dev`.

## API URL behavior

When a codespace name is present, the client uses:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

Otherwise it uses:

```text
http://localhost:8000/api/[component]/
```

## Available routes

- `/users`
- `/teams`
- `/activities`
- `/leaderboard`
- `/workouts`

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```
