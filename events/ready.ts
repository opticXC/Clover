import {
  Bot,
  DiscordReady,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function onReady(b: Bot, payload, readyEvent: DiscordReady) {
  console.log(`Logged in as ${readyEvent.user.username} `);
}
