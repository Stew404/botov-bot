const {SlashCommandBuilder} = require("discord.js")
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
            .setName("skip")
            .setDescription("Skip track"),
    async execute(interaction){
        await interaction.deferReply()

        const queue = useQueue(interaction.guildId)
        
        if(!queue?.isPlaying()){
            return interaction.followUp("Bot is not playing right now.")
        }

        queue.node.skip()

        return interaction.followUp("Track skipped")
    }
}