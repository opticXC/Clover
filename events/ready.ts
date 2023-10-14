// deno-lint-ignore-file no-explicit-any
import {
  Bot,
  DiscordReady,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

import { deleteCommands, guild_id } from "../deps.ts";
import { pingCommand } from "../commands/ping.ts";
import { imagesCommand } from "../commands/animalImages.ts";
import { dictionaryCommand } from "../commands/dictionary.ts";
import { factCommand } from "../commands/fact.ts";
import { randomCommand } from "../commands/random.ts";
import { nsfwCommand } from "../commands/nsfw/nsfw_command.ts";
import { quoteCommand } from "../commands/quote.ts";

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
  await bot.helpers.createGuildApplicationCommand(factCommand, guild_id);
  await bot.helpers.createGuildApplicationCommand(randomCommand, guild_id);
  await bot.helpers.createGuildApplicationCommand(nsfwCommand, guild_id);
  await bot.helpers.createGuildApplicationCommand(quoteCommand, guild_id);
}

async function checkReset(bot: Bot) {
  if (Deno.args.includes("--reset")) {
    await deleteCommands(bot);

    console.log("deleted commands");
    Deno.exit(1);
  }
}
