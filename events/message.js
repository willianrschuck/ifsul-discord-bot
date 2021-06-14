exports.run = (client, msg) => {

    if (isValidCommand(client, msg)) {

        log(client, msg);

        const args = extractArgs(client.prefix, msg);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (cmd) {
            msg.delete({ timeout: 3300 });
            cmd.run(client, msg, args);
        }

    }

}

function log(client, msg) {
    const channel = client.channels.cache.find(channel => channel.id == 854006348893913128);
    channel.send(`${msg.member.nickname}: ${msg.content}`);
}

function isValidCommand(client, msg) {
    return msg.guild && !msg.author.bot && msg.content.indexOf(client.prefix) === 0;
}

function extractArgs(prefix, msg) {
    return msg.content.slice(prefix.length).trim().split(/ +/g);
}