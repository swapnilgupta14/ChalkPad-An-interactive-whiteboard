# Development Guide

## Prerequisites

Record the exact supported versions of Node.js and the package manager. Use the package manager indicated by the committed lockfile.

## Setup

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_DIRECTORY>
cp .env.example .env
```

Install dependencies:

```bash
npm install
```

## Environment

Document every variable used by the frontend and backend:

| Variable | Used by | Required | Description |
| --- | --- | --- | --- |
| `VITE_API_URL` | Frontend | If applicable | HTTP API base URL |
| `VITE_SOCKET_URL` | Frontend | If applicable | Socket.IO server URL |
| `PORT` | Backend | If applicable | Local server port |
| `CLIENT_ORIGIN` | Backend | If applicable | Allowed frontend origin |

Vite exposes variables prefixed with `VITE_` to browser code. Never put secrets in frontend environment variables.

## Run the application

Replace these examples with the actual scripts from `package.json`:

```bash
npm run dev
```

If frontend and backend are separate packages, document the command and working directory for each process.

## Quality checks

Document and maintain scripts for:

```bash
npm run lint
npm test
npm run build
```

If a command is not configured, either add it or remove it from this guide and CI.

## Debugging

Include:

- Frontend and backend log locations.
- How to inspect Socket.IO connections and events.
- How to reproduce a multi-user session locally.
- How to reset local data, if applicable.
- Known development limitations.
