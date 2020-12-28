const Discord = require('discord.js');
const fs = require('fs');
const {token, prefix} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split('.')[0];
        console.log(`Tentando carregar o comando ${commandName}`);
        client.commands.set(commandName, props);
    })
});

client.on('message', (msg) => { 
    if (!msg.guild || msg.author.bot) return;

    if (msg.content.indexOf(prefix) !== 0) return;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (cmd) {
        msg.delete({timeout: 2000});
        cmd.run(client, msg, args);
    }

});

client.login(token);

client.on('ready', () => {
    console.log('The Bot is ready.');
});