exports.run = (client, msg, args) => {

    args = args.map(arg => arg.toUpperCase());
    let roles = msg.guild.roles.cache.filter(role => args.includes(role.name.toUpperCase()));
    let rolesName = roles.map(role => role.name.toUpperCase());

    if (roles.size < args.length) {

        let disciplinasNaoEncontradas = args.filter(sigla => !rolesName.includes(sigla));
        msg.channel.send(`${msg.member}, não consegui encontrar nenhuma disciplina que se chamasse: ${disciplinasNaoEncontradas.join(', ')}`)
        .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));

    }
    
    if (roles.size > 0) {

        roles.forEach(role => {
            msg.member.roles.add(role);
        });

        msg.channel.send(`${msg.member}, você agora tem acesso a ${rolesName.join(', ')}`)
        .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));

    }

}