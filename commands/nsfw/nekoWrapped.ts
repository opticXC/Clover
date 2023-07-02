import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  ApplicationCommandOptionTypes,
  CreateApplicationCommand,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

const hTags: string[] = ["hboobs", "hass", "hentai", "paizuri", "hkitsune"];

export const nekoWrappedCommand: CreateApplicationCommand = {
  name: "nsfw",
  description: "nsfw commands",

  options: [
    {
      name: "type",
      description: "image type to get",
      type: ApplicationCommandOptionTypes.String,
      choices: [
        { name: "boobs", value: "hboobs" },
        { name: "ass", value: "hass" },
        { name: "hentai", value: "hentai" },
        { name: "paizuri", value: "paizuri" },
        { name: "kitsune", value: "hkitsune" },
      ],
      required: false,
    },
  ],
};

export async function nekoWrappedRun(bot: Bot, interaction: Interaction) {
  if (!(await bot.helpers.getChannel(interaction.channelId!.toString())).nsfw) {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `command is only allowed in nsfw channels`,
          flags: 64,
        },
      }
    );
    return;
  }

  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
  });

  const tag =
    interaction.data?.options?.flatMap((option) => {
      if (option.name == "type") return option.value;
    })[0] ?? hTags[Math.floor(Math.random() * hTags.length)];

  const fetch_res = await (
    await fetch(`https://nekobot.xyz/api/image?type=${tag}`)
  ).json();

  await bot.helpers.sendFollowupMessage(interaction.token, {
    type: InteractionResponseTypes.UpdateMessage,
    data: { content: `${fetch_res["message"]}` },
  });
}
