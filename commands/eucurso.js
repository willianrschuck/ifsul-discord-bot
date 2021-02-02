const semestres = require("./semestres.json");
const siglasDisciplianas = [].concat.apply([], semestres.map(semestre => semestre.disciplinas.map(disciplina => disciplina.sigla.toUpperCase())));

exports.run = (client, msg, args) => {

    if (msg.channel.id != '751585982977146961') {
        
        args = args.map(arg => arg.toUpperCase());
        let roles = msg.guild.roles.cache.filter(role => {
            return args.includes(role.name.toUpperCase()) && siglasDisciplianas.includes(role.name.toUpperCase());
        });
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

}