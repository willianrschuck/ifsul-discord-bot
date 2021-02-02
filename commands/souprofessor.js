exports.run = (client, msg, args) => {

    if (msg.channel.id == '751585982977146961') {
        
        msg.channel.send(`${msg.member} esse comando não foi implementado... :eyes:`)
        .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));

    }

}