exports.run = (client, msg, args) => {

    if (msg.channel.id == '751585982977146961') {

        let role = msg.guild.roles.cache.find(role => role.name == 'Aluno');

        msg.member.roles.add(role);

        msg.channel.send(`${msg.member} privilégios concedidos! :man_technologist:`)
        .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));
    
    }

}