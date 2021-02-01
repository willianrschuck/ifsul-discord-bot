const Discord = require('discord.js');
const fs = require('fs');
const {token, prefix} = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.prefix = prefix;

loadCommands();
loadEvents();

client.on('ready', () => {
    console.log('The Bot is ready.');
    client.user.setActivity('Hello, Dave.');
});

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

function loadEvents() {

    fs.readdir('./events/', (err, files) => {

        if (err)
            return console.error(err);

        files.forEach(filename => {

            const eventObj = require(`./events/${filename}`);
            let eventName = filename.split('.')[0];

            console.log(`Tentando carregar o evento ${eventName}`);

            // .bind(...) serve para mudar o contexto do 'this', mas no caso ele é usado para
            // passar o client para todos os eventos como o primeiro parâmetro
            client.on(eventName, eventObj.run.bind(null, client)); 

        });

    });

}

client.login(token);