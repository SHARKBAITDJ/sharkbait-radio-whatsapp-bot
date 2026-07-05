# Sharkbait Radio WhatsApp Auto-Responder

Auto-replies to WhatsApp messages using your own WhatsApp account (via WhatsApp Web linking) —
no Meta Developer account or Business API needed.

## Option A: Run for free on your own computer (recommended, no cost)

Requires [Node.js](https://nodejs.org) installed (LTS version) and this repo downloaded/cloned.

```bash
git clone https://github.com/SHARKBAITDJ/sharkbait-radio-whatsapp-bot.git
cd sharkbait-radio-whatsapp-bot
npm install
npm start
```

A QR code will print right in your terminal within ~30-60 seconds. Scan it with WhatsApp on
your phone: **Settings → Linked Devices → Link a Device**. Once linked, the terminal shows
`✅ Sharkbait Radio WhatsApp bot is connected and listening.` and it starts auto-replying.

**Tradeoff:** this only auto-replies while that terminal window / your computer is running and
online. Close the terminal or shut down the computer and replies stop until you run `npm start`
again (no re-scan needed — the session is saved locally in a `.wwebjs_auth` folder next to the code).

To keep it running in the background without a visible terminal window, you can instead run
`npx pm2 start index.js --name sharkbait-bot` (installs [pm2](https://pm2.keymetrics.io/) on the
fly) — it keeps the process alive in the background and auto-restarts it if it crashes, as long
as the computer itself stays on.

## Option B: Deploy to Railway (~$5/month, always-on 24/7 even with your computer off)

Click the button below, log in to Railway (GitHub login works), and deploy. Railway's Hobby
plan starts at $5/month usage-based billing — there's no longer a free tier for
always-on services.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new?template=https%3A%2F%2Fgithub.com%2FSHARKBAITDJ%2Fsharkbait-radio-whatsapp-bot)

## First-time setup after deploy

1. Open the deployed service in Railway.
2. Go to the **Deployments** tab → click the latest deployment → **View Logs**.
3. A QR code will print in the logs within ~30-60 seconds.
4. On your phone: open WhatsApp → **Settings** → **Linked Devices** → **Link a Device** → scan the QR code shown in the logs.
5. Once linked, the logs will show `✅ Sharkbait Radio WhatsApp bot is connected and listening.`
6. The bot now auto-replies to incoming WhatsApp messages based on `config.json` (keywords: menu, request, schedule, sharkbait, plus greeting/away fallback).

## Updating replies

Edit `config.json` and push — Railway auto-redeploys. Or update keywords in the
Sharkbait Radio Autoresponder page and re-export a fresh `config.json`.

## Persistence note

The linked session is stored in a `/data` volume inside the container. If you ever delete
the Railway service or its volume, you'll need to re-scan the QR code once.
