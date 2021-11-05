const { handleMessage } = require('../util/registration')

exports.run = (client, msg) => {

    handleMessage(msg);

    if (isValidCommand(client, msg)) {

        log(msg);

        const args = extractArgs(client.prefix, msg);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (cmd) {
            msg.delete({ timeout: 3300 });
            cmd.run(client, msg, args);
        }

    }

}

function log(msg) {
    msg.channel.send(`${msg.member.nickname || msg.member.user.username}: ${msg.content}`);
}

function isValidCommand(client, msg) {
    return msg.guild && !msg.author.bot && msg.content.indexOf(client.prefix) === 0;
}

function extractArgs(prefix, msg) {
    return msg.content.slice(prefix.length).trim().split(/ +/g);
}