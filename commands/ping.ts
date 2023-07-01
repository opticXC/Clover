import {
  Bot,
  CreateApplicationCommand,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export const pingCommand: CreateApplicationCommand = {
  name: "ping",
  description: "pong!",
};

export async function pingRun(bot: Bot, interaction: Interaction) {
  const start_time = performance.now();
  await bot.helpers
    .sendInteractionResponse(interaction.id, interaction.token, {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: { content: "calculaing ping ..." },
    })
    .then(
      async () =>
        await bot.helpers.editOriginalInteractionResponse(interaction.token, {
          content: `pong! ${Math.ceil(performance.now() - start_time)} ms`,
        })
    );
}
