const gerenciadorSalas = require('../util/gerenciador-salas')

const categoryId = "759070165127659612";

exports.run = (client, msg, args) => {

    let channelName = args.join(' ');

    let channel = msg.guild.channels.cache.find(channel => channel.name.toLowerCase() == channelName.toLowerCase() && channel.isText);

    if (channel) {
        msg.reply(`O canal ${channel} já existe!`);
    } else {
        createChannels(msg, channelName);
    }

}

async function createChannels(msg, channelName) {

    let promiseVoiceChannel = msg.guild.channels.create(
        channelName, {
        type: 'voice',
        parent: categoryId,
        permissionOverwrites: [
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL']
            }
        ]
    });

    let promiseTextChannel = msg.guild.channels.create(
        channelName, {
        type: 'text',
        parent: categoryId,
        permissionOverwrites: [
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL']
            }
        ]
    });

    Promise.all([promiseVoiceChannel, promiseTextChannel])
    .then((channels) => {
        gerenciadorSalas.createMonitor(channels);
    });

}

