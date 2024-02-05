const {SlashCommandBuilder} = require("discord.js")
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
            .setName("stop")
            .setDescription("Stop the bot"),
    async execute(interaction){
        await interaction.deferReply()

        const queue = useQueue(interaction.guildId)

        if(!queue?.isPlaying()){
            return interaction.followUp("Bot is not playing right now.")
        }
        
        queue.node.stop()

        return interaction.followUp("Bot has stopped")
    }
}