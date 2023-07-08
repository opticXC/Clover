import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  CreateApplicationCommand,
  Embed,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export const factCommand: CreateApplicationCommand = {
  name: "fact",
  description: "Get a random useless fact",
};

export async function factRun(bot: Bot, interaction: Interaction) {
  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
  });

  const url = rawFactsUrls[Math.floor(Math.random() * rawFactsUrls.length)];

  const fetch_res = await (await fetch(url)).json();

  const embed: Embed = {
    title: "Random useless fact",
    color: 641757,
    fields: [
      {
        name: "Did You know?",
        value: `${fetch_res["text"]}`,
      },
    ],
  };

  await bot.helpers.sendFollowupMessage(interaction.token, {
    type: InteractionResponseTypes.UpdateMessage,
    data: {
      embeds: [embed],
    },
  });
}

const rawFactsUrls: string[] = [
  "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
];
