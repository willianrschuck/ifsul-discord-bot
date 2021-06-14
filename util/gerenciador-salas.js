const monitoredChannels = {};

exports.onVoiceStateUpdate = (client, oldVoiceState, newVoiceState) => {
    if (newVoiceState.channel) {
        onUserConnect(newVoiceState.channel);
    }
    if (oldVoiceState.channel) {
        onUserDisconnect(oldVoiceState.channel);
    };
}

exports.createMonitor = (channels) => {
    let [voiceChannel, textChannel] = channels;

    let monitor = {
        'voiceChannel' : voiceChannel,
        'textChannel' : textChannel,
        'timeout' : null,
        
    }

    createTimeout(monitor);

    monitoredChannels[voiceChannel.id] = monitor;

}

function cancelTimeout(obj) {
    clearTimeout(obj.timeout);
    obj.timeout = null;
    obj = null;
}

function createTimeout(obj) {
    obj.timeout = setTimeout(() => { 
        obj.voiceChannel.delete();
        obj.textChannel.delete();
    }, 60 * 1000);
}

function onUserConnect(channel) {
    let objMonitor = monitoredChannels[channel.id];

    if (objMonitor && objMonitor.timeout) {
        cancelTimeout(objMonitor);
    }
}

function onUserDisconnect(channel) {
    let objMonitor = monitoredChannels[channel.id];

    if (objMonitor && channel.members.size == 0) {
        createTimeout(objMonitor);
    }
}