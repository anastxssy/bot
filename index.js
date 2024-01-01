const { ActivityType, Client, Collection, GatewayIntentBits } = require('discord.js');

const config = require('../config');

const client = new Client({intents: [Object.keys(GatewayIntentBits)]});

client.commands = new Collection();
client.cooldown = new Collection();

require('./src/connect-mongodb')();
require('./src/register-commands')(client);

client.on('ready', () => {
    client.user.setActivity({name: 'Sagacity', type: ActivityType.Listening});
    console.log(`[Bot] Logged in as ${client.user.username}.`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.client.commands.get(interaction.commandName)) return;
        await interaction.client.commands.get(interaction.commandName).execute(client, interaction);
    };
});

client.login(config.bot.token);