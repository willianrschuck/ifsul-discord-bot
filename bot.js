const Discord = require('discord.js');
const fs = require('fs');
const {token, prefix} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

loadCommands();

client.on('message', (msg) => {

    if (isValidCommand(msg)) {

        const args = extractArgs(msg);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (cmd) {
            msg.delete({ timeout: 2000 });
            cmd.run(client, msg, args);
        }

    }

});

client.on('ready', () => {
    console.log('The Bot is ready.');
});

function isValidCommand(msg) {
    return msg.guild && !msg.author.bot && msg.content.indexOf(prefix) === 0;
}

function extractArgs(msg) {
    return msg.content.slice(prefix.length).trim().split(/ +/g);
}

function loadCommands() {

    fs.readdir('./commands/', (err, files) => {

        if (err) 
            return console.error(err);

        files.forEach(filename => {

            if (!filename.endsWith('.js'))
                return;

            let commandFunction = require(`./commands/${filename}`);
            let commandName = filename.split('.')[0];

            console.log(`Tentando carregar o comando ${commandName}`);

            client.commands.set(commandName, commandFunction);

        });

    });

}

client.login(token);