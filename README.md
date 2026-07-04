# Sharkbait Radio WhatsApp Auto-Responder

Auto-replies to WhatsApp messages using your own WhatsApp account (via WhatsApp Web linking) —
no Meta Developer account or Business API needed.

## Deploy

Click the button below, log in to Railway (GitHub login works), and deploy:

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
