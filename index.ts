import { Intents, createBot, startBot, env_vars, bot_token } from "./deps.ts";
import { onInteraction } from "./events/interaction.ts";
import { onMessage } from "./events/message.ts";
import { onReady } from "./events/ready.ts";

if (!bot_token) {
  console.log("BOT_TOKEN not setup");
  Deno.exit(1);
}

const intents =
  Intents.GuildMembers |
  Intents.GuildMessages |
  Intents.Guilds |
  Intents.MessageContent;

const bot = createBot({
  token: bot_token,
  intents: intents,
  events: {},
});

bot.events.ready = onReady;
bot.events.messageCreate = onMessage;
bot.events.interactionCreate = onInteraction;

await startBot(bot);
