// ...existing code...

# SafeNow — AI-powered Emergency Detection & Response

SafeNow is an AI-driven demo for women safety emergency alerts. It combines a React + Vite frontend "panic button" with Turbotic automation step scripts that analyze distress, decide severity, notify responders (WhatsApp / SMS / Email) and log incidents to Google Sheets.

Key goals:
- Rapid proof-of-concept for automated distress detection and response.
- Minimal frontend exposing no secret keys.
- Reusable Turbotic step scripts for analysis, branching and notifications.

## Features
- Panic button UI with geolocation capture.
- Text analysis of messages (OpenAI / GenAI) to infer distress level.
- Decision branching that treats explicit "panic" as high severity.
- Notifications via Twilio (WhatsApp & SMS) and email; incident logging to Google Sheets.
- Backend proxy to keep Turbotic API keys server-side.

## Repo layout (important paths)
- Ai Automation System/
  - web/ — frontend app (Vite + React)
    - index.html
    - src/
      - main.jsx
      - api/emergency.js — client helper used by the panic button
      - components/PanicButton.jsx
    - api/trigger.js — serverless proxy (Vercel/Cloud Functions)
    - .env.example
  - Turbotic automation scripts (root) — analysis, branching, notifications, sheets, webhook handlers

## Quick start (frontend)
1. Open a terminal at the frontend folder:
   cd "d:\Ai-powered-emergency-detection-and-response-system\Ai Automation System\web"
2. Install and run:
   npm install
   npm run dev
3. Open the dev server URL printed by Vite (usually http://localhost:5173).

The frontend calls the trigger endpoint which either (in dev) proxies the Turbotic trigger or (in production) hits your serverless /api/trigger which forwards the request with secrets.

## Environment variables

Frontend (.env or .env.local — Vite expects VITE_ prefix):
- VITE_EMERGENCY_API_URL — URL to trigger Turbotic automation (or your proxy)
- VITE_EMERGENCY_API_KEY — (dev only) Turbotic API key for local proxy
- VITE_EMERGENCY_D_ID — device/deployment id used by automation

Server / Turbotic / Integrations:
- TURBOTIC_API_KEY (server-side)
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM, TWILIO_WHATSAPP_TO
- TWILIO_SMS_FROM, TWILIO_SMS_TO
- GSHEET_ID, GSHEET_CLIENT_EMAIL, GSHEET_PRIVATE_KEY
- POLICE_EMAIL

Never commit secret values. Use your hosting provider's secret storage for production.

## Deployment
- Frontend: deploy the web/ directory to Vercel, Netlify, or any static host.
- If using Vercel, add a serverless function /api/trigger that forwards requests to Turbotic and keep TURBOTIC_API_KEY in Vercel secrets.
- Ensure HTTPS and correct Twilio/Turbotic credentials.

## Extending & Contributing
- Improve UI in web/src/components.
- Customize Turbotic step scripts to match your workflows and integrations.
- Add unit tests for frontend helpers (api/emergency.js) and components.
- Keep .env.example up to date.

## Security & Notes
- Treat this repository as a demo — validate and harden before production use.
- Limit who can trigger alerts and add rate limiting to prevent abuse.
- Validate geolocation and user consent flows per local law.

## License
MIT

// ...existing code...
