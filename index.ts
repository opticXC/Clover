import { Intents, createBot } from "./deps.ts";
import { onReady } from "./events/ready.ts";

const bot_token = Deno.env.get("BOT_TOKEN");

if (!bot_token) {
  console.log("BOT_TOKEN not setup");
  Deno.exit(1);
}

const intents = Intents.GuildMembers | Intents.GuildMessages | Intents.Guilds;

const bot = createBot({
  token: bot_token,
  intents: intents,
  events: {},
});

bot.events.ready = onReady;
