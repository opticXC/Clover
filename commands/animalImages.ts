import {
  ApplicationCommandOptionTypes,
  Bot,
  CreateApplicationCommand,
  Embed,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

const imageTypes = ["shibes", "cats", "birds"];

export const imagesCommand: CreateApplicationCommand = {
  name: "images",
  description: "Images of animals!",
  options: [
    {
      name: "type",
      description: "image type",
      type: ApplicationCommandOptionTypes.String,
      required: false,
      choices: [
        { name: "dogs", value: "shibes" },
        { name: "cats", value: "cats" },
        { name: "birds", value: "birds" },
      ],
    },
  ],
};

export async function imagesRun(bot: Bot, interaction: Interaction) {
  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
  });

  const image_type =
    interaction.data?.options?.flatMap((option) => {
      if (option.name == "type") return option.value;
    })[0] ?? imageTypes[Math.floor(Math.random() * imageTypes.length)];

  const fetch_res = await fetch(
    `http://shibe.online/api/${image_type}?count=1`
  ).then(async (data) => await data.json());

  const embed: Embed = {
    title: `Here! have a ${image_type}`,
    image: { url: fetch_res[0] },
    footer: {
      text: `Requested by ${interaction.user.username}`,
      iconUrl: bot.helpers.getAvatarURL(
        interaction.user.id,
        interaction.user.discriminator
      ),
    },
  };
  await bot.helpers.sendFollowupMessage(interaction.token, {
    type: InteractionResponseTypes.UpdateMessage,
    data: { embeds: [embed] },
  });
}
