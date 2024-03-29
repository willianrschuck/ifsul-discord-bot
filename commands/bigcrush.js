exports.run = (client, msg, args) => {

    if (isAdministrator(msg.member)) {
        deletarCanaisDasDisciplinas(msg);
    } else {
        msg.channel.send(`I’m sorry ${msg.member}, I’m afraid I can’t do that`);
    }

}

function deletarCanaisDasDisciplinas(msg) {

    let semestres = require("./semestres.json");

    let arrayNomesSemestres = semestres.map(semestre => semestre.nome);
    let arrayNomesRoles = [].concat.apply([], semestres.map(semestre => semestre.disciplinas.map(disciplina => disciplina.sigla)));

    let categoriasSemestre =
        msg.guild.channels.cache.filter(channel => arrayNomesSemestres.includes(channel.name) && channel.type == "category");

    let idsCanaisSemestres = categoriasSemestre.map(channel => channel.id);

    let canaisDisciplinas = msg.guild.channels.cache.filter(channel => idsCanaisSemestres.includes(channel.parentID));
    let rolesDisciplinas = msg.guild.roles.cache.filter(role => arrayNomesRoles.includes(role.name));

    canaisDisciplinas.forEach(canal => canal.delete());
    categoriasSemestre.forEach(canal => canal.delete());
    rolesDisciplinas.forEach(role => role.delete());

}

function isAdministrator(member) {
    return member.hasPermission('ADMINISTRATOR');
}