import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  AllowedMentionsTypes,
  Message,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { catify_id, guild_id } from "../deps.ts";

export async function onMessage(bot: Bot, message: Message) {
  if (message.isFromBot) return;
  if (message.guildId?.toString() != guild_id) return;

  await catify(bot, message);
}

async function catify(bot: Bot, message: Message) {
  const author = await bot.helpers.getMember(
    message.guildId!,
    message.authorId
  );

  author.roles.flatMap(async (id) => {
    if (id.toString() == catify_id) {
      if (!message.content.toLowerCase().includes("nya")) {
        await bot.helpers.deleteMessage(
          message.channelId,
          message.id,
          "violates catify"
        );
        const s_msg = await bot.helpers.sendMessage(message.channelId, {
          content: `<@${author.id}>, you have been catified nya~ \nyou have to use nya in your messages nya~`,
          allowedMentions: { parse: [AllowedMentionsTypes.UserMentions] },
        });
        
        // sleep for 7000 milliseconds
        await new Promise((resolve) => setTimeout(resolve, 7000));

        await bot.helpers.deleteMessage(
          message.channelId,
          s_msg.id,
          "catified"
        );
      }

    }
  });
}
