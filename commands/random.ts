import {
  ApplicationCommandOptionTypes,
  Bot,
  CreateApplicationCommand,
  Embed,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export const randomCommand: CreateApplicationCommand = {
  name: "random",
  description: "random stuff, totaly not biased",
  options: [
    {
      name: "type",
      description: "Unrandomise the random",
      type: ApplicationCommandOptionTypes.String,
      required: true,
      choices: [
        { name: "Miscellanious", value: "Misc" },
        { name: "Dark", value: "Dark" },
        { name: "Pun", value: "Pun" },
      ],
    },
  ],
};

export async function randomRun(bot: Bot, interaction: Interaction) {
  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
  });
  const j_type =
    interaction.data?.options?.flatMap((opt) => {
      if (opt.name == "type") return opt;
    })[0]?.value ?? "Any";

  const fetch_res = await (
    await fetch(`https://v2.jokeapi.dev/joke/${j_type}?type=single`)
  ).json();
  const embed: Embed = {
    title: `Random | Type:${j_type}`,
    description: `${fetch_res.joke}`,
    color: 641757,
  };

  await bot.helpers.sendFollowupMessage(interaction.token, {
    type: InteractionResponseTypes.DeferredUpdateMessage,
    data: { embeds: [embed] },
  });
}
