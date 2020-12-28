const https = require('https');

exports.run = (client, msg, args) => {

    let member = msg.guild.member(msg.author);
    let channelName = `Canal de ${member.displayName}`;

    let channel = msg.guild.channels.cache.find(channel => channel.name.endsWith(member.displayName) && channel.isText);

    if (!channel) {
        msg.reply('Você ainda não tem um canal');
        return;
    }

    let userMention = msg.mentions.users.first();

    if (!userMention) {
        msg.reply('Você não citou nenhum usuário. Utilize @[usuario]');
        return;
    }

    channel.permissionOverwrites.get(userMention.id).delete();
};

