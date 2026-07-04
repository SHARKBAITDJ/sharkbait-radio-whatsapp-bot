// Sharkbait Radio WhatsApp Auto-Responder
// Uses whatsapp-web.js (unofficial, personal WhatsApp Web session) — no Meta Developer account needed.
// On first run, a QR code is printed to the logs. Scan it with WhatsApp on your phone:
// WhatsApp app -> Settings -> Linked Devices -> Link a Device.
// After that one-time scan, the session persists (stored in .wwebjs_auth) and the bot
// auto-replies to incoming WhatsApp messages based on config.json.

const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
);

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: "/data/.wwebjs_auth" }),
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  },
});

client.on("qr", (qr) => {
  console.log("\n=== SCAN THIS QR CODE WITH WHATSAPP (Linked Devices) ===\n");
  qrcode.generate(qr, { small: true });
  console.log("\n=========================================================\n");
});

client.on("ready", () => {
  console.log("✅ Sharkbait Radio WhatsApp bot is connected and listening.");
});

client.on("auth_failure", (msg) => {
  console.error("❌ Auth failure:", msg);
});

client.on("disconnected", (reason) => {
  console.error("⚠️ Client disconnected:", reason);
});

function findReply(bodyRaw) {
  const body = (bodyRaw || "").trim().toLowerCase();
  if (!body) return null;

  // Exact/contains match against active keywords
  for (const kw of config.keywords) {
    if (!kw.active) continue;
    if (body === kw.keyword.toLowerCase() || body.includes(kw.keyword.toLowerCase())) {
      return kw.reply;
    }
  }
  return null;
}

client.on("message", async (msg) => {
  try {
    // Ignore group messages and messages from self
    if (msg.from.endsWith("@g.us") || msg.fromMe) return;

    const chat = await msg.getChat();
    const isFirstMessage = (chat.unreadCount || 0) <= 1;

    const matched = findReply(msg.body);

    if (matched) {
      await chat.sendMessage(matched);
      console.log(`Replied to ${msg.from} with keyword match.`);
    } else if (isFirstMessage) {
      await chat.sendMessage(config.greeting);
      console.log(`Sent greeting to ${msg.from}.`);
    } else {
      await chat.sendMessage(config.away);
      console.log(`Sent away/fallback message to ${msg.from}.`);
    }
  } catch (err) {
    console.error("Error handling message:", err);
  }
});

client.initialize();
