const https = require('https');
const {category_id} = require('./discord.json');

exports.run = (client, msg, args) => {

    let member = msg.guild.member(msg.author);
    let regex = new RegExp(`canal[ -]de[ -]${member.displayName}`, 'gi')
    let channels = msg.guild.channels.cache.filter(channel => channel.name.match(regex));

    channels.forEach(channel => channel.delete());

};