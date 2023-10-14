import { Bot } from "https://deno.land/x/discordeno@18.0.1/bot.ts";
import {
  CreateApplicationCommand,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";



export const quoteCommand:CreateApplicationCommand = {
    
    name: "quote",
    description: "bs anime quotes",

}

const API_URL = "https://animechan.xyz/api/random";

interface Quote{
    anime: string;
    character: string;
    quote: string;
}

export async function quoteRun(bot: Bot, interaction: Interaction){
    await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
        type: InteractionResponseTypes.DeferredChannelMessageWithSource,
    });

    const quote:Quote = await (await fetch(API_URL)).json();

    const res = `\`\`\`${quote.quote}\n\t - ${quote.character},${quote.anime}`;
    await bot.helpers.sendFollowupMessage(interaction.token,{
        type: InteractionResponseTypes.UpdateMessage,
        data: {
            content: res
        }
    });
}