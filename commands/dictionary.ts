import {
  ApplicationCommandOptionTypes,
  Bot,
  CreateApplicationCommand,
  Embed,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { getWord } from "../wrapper/dictionary.ts";

export const dictionaryCommand: CreateApplicationCommand = {
  name: "getword",
  description: "fetch the dictionary definition of an English word",

  options: [
    {
      name: "word",
      description: "word to fetch",
      type: ApplicationCommandOptionTypes.String,
      required: true,
    },
  ],
};

export async function dictionaryRun(bot: Bot, interaction: Interaction) {
  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
  });

  const word = interaction.data?.options?.flatMap((option) => {
    if (option.name == "word") return option.value?.toString();
  })[0]!;

  const dict_res = await getWord(word);

  const meaningFields = [];
  for (const meaning of dict_res.meanings) {
    meaningFields.push({
      name: `**${meaning.partOfSpeech}**`,
      value: meaning.definitions[0].definition,
    });
  }

  const embed: Embed = {};

  embed.title = dict_res.word;
  embed.description = dict_res.phonetic;
  embed.color = 641757;
  embed.fields = meaningFields;
  embed.footer = { text: dict_res.source_url[0] };

  await bot.helpers.sendFollowupMessage(interaction.token, {
    data: { embeds: [embed] },
    type: InteractionResponseTypes.UpdateMessage,
  });
}
