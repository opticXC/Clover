export {
  createBot,
  Intents,
  startBot,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

import { load } from "https://deno.land/std@0.192.0/dotenv/mod.ts";
import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";

export const env_vars = await load();

export const bot_token = Deno.env.get("BOT_TOKEN") ?? env_vars["BOT_TOKEN"];
export const catify_id = Deno.env.get("CATIFY_ID") ?? env_vars["CATIFY_ID"];
export const guild_id = Deno.env.get("GUILD_ID") ?? env_vars["GUILD_ID"];

export async function deleteCommands(bot: Bot) {
  try {
    const globalCommands = await bot.helpers.getGlobalApplicationCommands();
    globalCommands.forEach(async (command) => {
      await bot.helpers.deleteGlobalApplicationCommand(command.id);
    });
  } catch (exception) {
    console.log(exception);
  }
  try {
    const guildCommands = await bot.helpers.getGuildApplicationCommands(
      guild_id
    );
    guildCommands.forEach(async (command) => {
      await bot.helpers.deleteGuildApplicationCommand(command.id, guild_id);
    });
  } catch (exception) {
    console.log(exception);
  }
}
