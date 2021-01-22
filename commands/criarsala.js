const categoryId = "801282584994119720";

const monitoredChannels = {};

exports.run = (client, msg, args) => {

    let member = msg.member;
    let channelName = args.join(' ');

    let channel = msg.guild.channels.cache.find(channel => channel.name.toLowerCase() == channelName.toLowerCase() && channel.isText);

    if (channel) {
        msg.reply(`O canal ${channel} já existe!`);
    } else {
        createChannels(msg, channelName);
    }

}

exports.onUserConnect = (client, voiceState) => {

    let channel = voiceState.channel;
    let objMonitor = monitoredChannels[channel.id];
    
    if (objMonitor && objMonitor.timeout) {
        objMonitor.cancelTimeout(objMonitor);
    }

}

exports.onUserDisconnect = (client, voiceState) => {

    let channel = voiceState.channel;
    let objMonitor = monitoredChannels[channel.id];

    if (channel.members.size == 0) {
        objMonitor.createTimeout(objMonitor);
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
        let [voiceChannel, textChannel] = channels;

        let monitor = {
            'voiceChannel' : voiceChannel,
            'textChannel' : textChannel,
            'timeout' : null,
            'cancelTimeout' : (obj) => {

                clearTimeout(obj.timeout);
                obj.timeout = null;
                obj = null;

            },
            'createTimeout' : (obj) => {

                obj.timeout = setTimeout(() => { 
                    obj.voiceChannel.delete();
                    obj.textChannel.delete();
                }, 10 * 1000);

            }
        }

        monitor.createTimeout(monitor);

        monitoredChannels[voiceChannel.id] = monitor;
        
    });

}

