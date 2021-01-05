exports.run = (client, msg, args) => {

    let semestres = require("./semestres.json");

    semestres.forEach(semestre => {
        
        msg.guild.channels
        .create(semestre.nome, {type: "category"}).then(category => {

            semestre.disciplinas.forEach(disciplina => {

                msg.guild.roles.create({
                    data: {
                        name: disciplina.sigla,
                        color: semestre.cor
                    }
                }).then(role => {

                    msg.guild.channels
                    .create(disciplina.nome, {
                        type: 'text',
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: role,
                                allow: ['VIEW_CHANNEL']
                            }
                        ]
                    });

                    msg.guild.channels
                    .create(disciplina.nome, {
                        type: 'voice',
                        parent: category.id,
                        permissionOverwrites: [
                            {
                                id: role,
                                allow: ['VIEW_CHANNEL']
                            }
                        ]
                    });

                });

            });

        });

        
    });

}