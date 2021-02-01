exports.run = (client, msg) => {

    if (isValidCommand(client, msg)) {

        const args = extractArgs(client.prefix, msg);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command);

        if (cmd) {
            msg.delete({ timeout: 2000 });
            cmd.run(client, msg, args);
        }

    }

}

function isValidCommand(client, msg) {
    return msg.guild && !msg.author.bot && msg.content.indexOf(client.prefix) === 0;
}

function extractArgs(prefix, msg) {
    return msg.content.slice(prefix.length).trim().split(/ +/g);
}