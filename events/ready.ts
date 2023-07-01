// deno-lint-ignore-file no-explicit-any
import {
  Bot,
  DiscordReady,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function onReady(_b: Bot, _payload: any, readyEvent: DiscordReady) {
  console.log(`Logged in as ${readyEvent.user.username} `);
}
