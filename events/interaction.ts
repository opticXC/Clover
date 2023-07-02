import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  Interaction,
  InteractionTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { pingRun } from "../commands/ping.ts";
import { imagesRun } from "../commands/animalImages.ts";
import { dictionaryRun } from "../commands/dictionary.ts";
import { factRun } from "../commands/fact.ts";
import { nekoWrappedRun } from "../commands/nsfw/nekoWrapped.ts";

export async function onInteraction(bot: Bot, interaction: Interaction) {
  if (interaction.type == InteractionTypes.ApplicationCommand) {
    try {
      await handleCommand(bot, interaction);
    } catch (exception) {
      console.log(exception);
    }
  }
}

async function handleCommand(bot: Bot, interaction: Interaction) {
  switch (interaction.data?.name) {
    case "ping":
      await pingRun(bot, interaction);
      break;
    case "images":
      await imagesRun(bot, interaction);
      break;
    case "getword":
      await dictionaryRun(bot, interaction);
      break;

    case "fact":
      await factRun(bot, interaction);
      break;
    case "nsfw":
      await nekoWrappedRun(bot, interaction);
      break;
    default:
      break;
  }
}
