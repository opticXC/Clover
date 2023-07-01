// deno-lint-ignore-file no-explicit-any
import {
  Bot,
  DiscordReady,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

import { deleteCommands, guild_id } from "../deps.ts";
import { pingCommand } from "../commands/ping.ts";
import { imagesCommand } from "../commands/animalImages.ts";
import { dictionaryCommand } from "../commands/dictionary.ts";

export async function onReady(
  bot: Bot,
  _payload: any,
  readyEvent: DiscordReady
) {
  console.log(`Logged in as ${readyEvent.user.username} `);
  console.log("setting up guild commands");

  await checkReset(bot);

  await bot.helpers.createGuildApplicationCommand(pingCommand, guild_id);
  await bot.helpers.createGuildApplicationCommand(imagesCommand, guild_id);
  await bot.helpers.createGuildApplicationCommand(dictionaryCommand, guild_id);

  await dashboard_temp(bot, readyEvent);
}

async function checkReset(bot: Bot) {
  if (Deno.args.includes("--reset")) {
    await deleteCommands(bot);

    console.log("deleted commands");
    Deno.exit(1);
  }
}

async function dashboard_temp(bot: Bot, readyEvent: DiscordReady) {
  serve(async (req: Request) => {
    return await new Response(
      `Logged in as ${
        readyEvent.user.username
      } \nCurrent uptime${Deno.osUptime()}`
    );
  }, {});
}
