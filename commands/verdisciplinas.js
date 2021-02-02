const semestres = require('./semestres.json')

exports.run = (client, msg, args) => {

    if (msg.channel.id == '751585982977146961') {

        let resposta = '';

        semestres.forEach(semestre => {

            resposta += `▬▬ **${semestre.nome}** ▬▬\n`;

            semestre.disciplinas.forEach(disciplina => {
                resposta += `**\`${disciplina.sigla}\`** - ${disciplina.nome}\n`;
            });

            if (resposta.length > 1000) {
                msg.channel
                .send(resposta)
                .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));
                resposta = '';
            }

        });

        if (resposta.length != 0) {
            msg.channel
            .send(resposta)
            .then(mensagem => mensagem.delete({ timeout: 60 * 1000 }));
            resposta = '';
        }

    }

}