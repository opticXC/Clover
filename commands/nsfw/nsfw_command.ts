import {
  ApplicationCommandOptionTypes,
  Bot,
  CreateApplicationCommand,
  Embed,
  Interaction,
  InteractionResponseTypes,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { get_post, get_random_post, Post } from "./nsfw_base.ts";

export const nsfwCommand: CreateApplicationCommand = {
  name: "nsfw",
  description: "base nsfw command",
  options: [
    {
      name: "tags",
      description: "space seperated tags",
      type: ApplicationCommandOptionTypes.String,
      required: false,
    },
    {
      name:"postid",
      description: "post id",
      type: ApplicationCommandOptionTypes.String,
      required:false,
    }
  ],
};

export async function nsfwRun(bot: Bot, interaction: Interaction) {
  if (interaction.channelId) {
    const channel = await bot.helpers.getChannel(interaction.channelId);
    if (!channel.nsfw) {
      bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "Cannot be used outside NSFW Channels and DMs",
          flags: 64,
        },
      });
      return;
    }
  }
  await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {
    type: InteractionResponseTypes.DeferredChannelMessageWithSource,
    data: { content: "Fetching post" },
  });

  const post_opt = interaction.data?.options?.find(opt => opt.name == "postid" );
  const tags_opt = interaction.data?.options?.find(opt => opt.name=="tags");

  var post;
  var tags;
  
  if (post_opt) post = await get_post(Number(post_opt.value));
  else  {
    if (tags_opt) tags = tags_opt.value?.toString();
    post = await get_random_post(tags || undefined );
  }
  
  if (post.tags.length > 40) {
    post.tags = post.tags.padEnd(40, "...");
  }

  const embed: Embed = {
    title: `Main Tag Provided: ${tags || "None"} `,
    description: `Post id: ${post.id}`,
    fields: [
      { name: "Complete Tags", value: `${post.tags}` },
    ],
    image: { url: post.file_url },
  };

  await bot.helpers.editOriginalInteractionResponse(interaction.token, {
    content: "Fetched",
    embeds: [embed],
  });
}
