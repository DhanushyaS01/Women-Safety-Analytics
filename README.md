# Ai-powered-emergency-detection-and-response-system — SafeNow

SafeNow is a proof-of-concept AI-driven emergency detection and response system focused on women’s safety. It provides a lightweight React + Vite frontend "panic button" that captures geolocation and message data, plus Turbotic automation step scripts that analyze distress (OpenAI/GenAI), branch on severity, notify responders (WhatsApp / SMS / Email via Twilio) and log incidents to Google Sheets.

This repo is intended as a demo and starter kit — not production-ready. Use it to prototype workflows, integrations, and UI for emergency alerts.

## Table of contents
- Features
- Architecture
- Repo layout
- Quick start (frontend)
- Dev workflow
- Environment variables
- Turbotic automation & integrations
- Deployment
- Security & privacy
- Testing
- Contributing
- License
- Acknowledgements

## Features
- Panic button UI with geolocation capture and optional custom message.
- Client that triggers Turbotic automation (via dev proxy or serverless /api/trigger).
- Distress analysis using OpenAI/GenAI to classify severity (LOW / MEDIUM / HIGH / PANIC).
- Branching logic (treats explicit "panic" as HIGH).
- Notification scripts for Twilio WhatsApp, Twilio SMS, and email to authorities.
- Incident logging to Google Sheets.
- Server-side proxy pattern to keep keys secret.

## Architecture (high level)
- Frontend (web/): Vite + React UI, captures location, sends trigger to backend/proxy.
- Serverless proxy (web/api/trigger.js): forwards requests to Turbotic with server-side API key.
- Turbotic automation scripts (root): steps for analysis, branching, notifications, logging.
- Third-party integrations: OpenAI/GenAI, Twilio, Google Sheets.

## Repo layout (important paths)
- Ai Automation System/
  - web/
    - index.html
    - src/
      - main.jsx
      - api/emergency.js — client helper used by panic button
      - components/PanicButton.jsx
    - api/trigger.js — serverless proxy (Vercel / Cloud Functions)
    - .env.example
  - Turbotic automation scripts (root) — analysis, branching, notifications, sheets, webhook handlers
  - README.md (this file)

## Quick start (frontend)
1. Open a terminal in the frontend folder:
   cd "d:\Ai-powered-emergency-detection-and-response-system\Ai Automation System\web"
2. Install dependencies and start dev server (Windows PowerShell or CMD):
   npm install
   npm run dev
3. Open the dev URL printed by Vite (commonly http://localhost:5173).

Notes:
- In development the frontend can proxy requests to Turbotic using VITE_EMERGENCY_API_KEY. In production, use a serverless proxy to avoid exposing secrets.

## Dev workflow & useful commands
- Install dependencies:
  npm install
- Run dev server:
  npm run dev
- Build production bundle:
  npm run build
- Run preview locally:
  npm run preview

Open files in VS Code for editing components: web/src/components/PanicButton.jsx and web/src/api/emergency.js.

## Environment variables

Frontend (.env or .env.local — Vite expects VITE_ prefix)
- VITE_EMERGENCY_API_URL — URL to trigger Turbotic automation or your /api/trigger proxy
- VITE_EMERGENCY_API_KEY — (dev only) Turbotic API key for local proxy
- VITE_EMERGENCY_D_ID — device/deployment id used by automation

Server / Turbotic / Third-party (server-side)
- TURBOTIC_API_KEY — server-side Turbotic key (keep secret)
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
- TWILIO_WHATSAPP_FROM, TWILIO_WHATSAPP_TO
- TWILIO_SMS_FROM, TWILIO_SMS_TO
- GSHEET_ID, GSHEET_CLIENT_EMAIL, GSHEET_PRIVATE_KEY
- POLICE_EMAIL

Never commit secret values. Use .gitignore and your hosting provider's secret storage for production.

## Turbotic automation & integration notes
- Scripts at repo root implement step logic and assume Turbotic-provided helpers (getContext/setContext).
- Core steps:
  - Distress analysis (OpenAI)
  - Decision branching (severity thresholds)
  - Generate summary (optional GenAI)
  - Send notifications (Twilio SMS/WhatsApp, Email)
  - Log incident to Google Sheets
- Adapt step scripts to match your platform API and credentials.

## Deployment
- Frontend: deploy Ai Automation System/web to Vercel, Netlify, or static host.
- If using Vercel: add a serverless function /api/trigger that forwards requests to Turbotic and set TURBOTIC_API_KEY in Vercel secrets.
- Ensure TLS (HTTPS) and that server-side secrets are stored securely.

## Security & privacy
- This project is a demo. Do not deploy to production without security hardening.
- Recommendations:
  - Keep API keys server-side.
  - Add authentication & authorization around who can trigger alerts.
  - Rate-limit triggers and abuse detection.
  - Encrypt sensitive service account keys at rest.
  - Follow local legal requirements for geolocation and emergency notifications.
  - Log actions and provide audit trails for alert handling.

## Testing
- Add unit tests for frontend helpers and components (api/emergency.js, PanicButton.jsx).
- Manual testing: verify location capture, simulate triggers, and inspect Turbotic automation logs.
- When testing messaging, use sandbox/test credentials for Twilio and limit real notifications.

## Extending & contributing
- Improve UI/UX: add confirmations, hold-to-trigger, multi-step verification.
- Add authentication for users and allow saved emergency contacts.
- Integrate with additional responders (local authorities, NGOs).
- Submit PRs for bug fixes or new features. Open issues to discuss major changes.

Contributing checklist:
- Fork the repo, create a topic branch, add tests for changes, and open a PR with a clear description.

## Troubleshooting
- Frontend can't reach API: verify VITE_EMERGENCY_API_URL and CORS/proxy settings.
- Missing geolocation: test in secure context (https) and grant location permission.
- Twilio errors: check account SID, auth token, and phone/WhatsApp numbers.

## License
MIT — see LICENSE file.

## Acknowledgements
- Example integration patterns inspired by Turbotic automations, OpenAI, Twilio and Google Sheets SDKs.
- Use responsibly and respect privacy and local laws when handling emergency data.

