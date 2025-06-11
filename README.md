# Turners Insurance AI Chat

This mission was building an AI-powered insurance chat application. It uses a Svelte frontend and a Node.js/ Express backend using Google Gemini

---

## Folder Structure

```
mission4-insurance-ai/
├── backend/                        # Node.js/Express API with Gemini integration
│   ├── config.ts
│   ├── index.ts                    # Main server entry point
│   ├── package.json
│   ├── tsconfig.json               # TypeScript configuration
│   └── ...
│
├── frontend/                       # Svelte + TypeScript + Vite chat UI
│   ├── src/
│   │   ├── App.svelte              # Main Svelte component (chat UI)
│   │   ├── main.ts
│   │   ├── geminiFormat.ts         # Helper for formatting messages
│   │   └── styles/
│   │       └── styles.css
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── docker-compose.yml              # Docker Compose configuration for both services
└── README.md

```

---

## Frontend

-  **Location:** `frontend/`
-  **Technologies:** Svelte, TypeScript, Vite
-  **Features:**
   -  Chat interface for users
   -  Markdown rendering

### Local Development

```sh
cd frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in a web browser.

---

## Backend

-  **Location:** `backend/`
-  **Technologies:** Node.js, Express, TypeScript
-  **Features:**
   -  Receives chat messages from frontend
   -  Sends messages to Google Gemini API
   -  Returns AI responses

### Local Development

```bash
cd backend
cp .env.example .env   # Set your Gemini API key in .env
npm install
npm run dev
```

The backend will run on [http://localhost:4000](http://localhost:4000).

---

## Running Both with Docker

**Requirements:**

-  [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Quick Start

From the project root:

```bash
docker-compose up --build
```

-  Frontend: [http://localhost:5173](http://localhost:5173)
-  Backend: [http://localhost:4000](http://localhost:4000)

### Stopping

Press `Ctrl+C` in the terminal, then run:

```sh
docker-compose down
```

---

## Environment Variables

-  **Backend:**
   -  Copy `backend/.env.example` to `backend/.env` and set your Gemini API key and other configurations.

---

## Troubleshooting

-  If you see `Cannot find module '/app/dist/index.js'`, make sure TypeScript is building to the `dist` folder.
-  If the frontend cannot connect to the backend, check that both containers are running and the ports match.
-  For local development, the frontend uses `localhost:4000` to talk to the backend. In Docker, it uses the service name `backend:4000`.

---

## Future Improvements

-  Accessibility features for screen readers.
-  Light and Dark mode toggle.

---
