const {SlashCommandBuilder} = require("discord.js")
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
            .setName("play")
            .setDescription("Play music")
            .addStringOption(option =>
                option
                    .setName("input")
                    .setDescription("Link or search query")
                    .setRequired(true)),
    async execute(interaction){
        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;

        if (!channel) return interaction.reply('You are not connected to a voice channel!');

        const query = interaction.options.getString('input', true);

        await interaction.deferReply();

        // const result = await player.search(query)

        try {
            const { track } = await player.play(channel, query, {
                searchEngine: "auto",
                nodeOptions: {
                    metadata: interaction
                }
            });

            return interaction.followUp(`**${track.title}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Something went wrong: ${e}`);
        }
    }
}