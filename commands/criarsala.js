const https = require('https');
const {category_id} = require('./discord.json');

exports.run = (client, msg, args) => {

    let member = msg.guild.member(msg.author);
    let channelName = `Canal de ${member.displayName}`;

    let channel = msg.guild.channels.cache.find(channel => channel.name.endsWith(member.displayName) && channel.isText);

    if (channel) {
        msg.reply(`Já tens sua sala, #${channel.name}!`);
        return;
    }

    msg.guild.channels
    .create(channelName, {
        type: 'text',
        parent: category_id,
        permissionOverwrites: [
            {
                id: msg.guild.me.id,
                allow: ['VIEW_CHANNEL', 'MANAGE_CHANNELS', 'MANAGE_ROLES']
            },
            {
                id: msg.author.id,
                allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }
        ]
    }).catch((reason) => {
        console.log(reason);
        msg.reply(reason.message).then(
            msg => msg.delete({timeout: 10000})
        );
    });

};