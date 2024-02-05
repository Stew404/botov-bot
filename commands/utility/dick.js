const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("dick")
            .setDescription("dick-dock"),
    async execute(interaction){
        await interaction.reply("dock!")
    }
}