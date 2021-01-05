exports.run = (client, msg, args) => {

    let semestres = require("./semestres.json");
    let arrayNomesSemestres = semestres.map(semestre => semestre.nome);
    let arrayNomesRoles = [].concat.apply([], semestres.map(semestre => semestre.disciplinas.map(disciplina => disciplina.sigla)));

    let canaisSemestres = msg.guild.channels.cache.filter(
        channel => arrayNomesSemestres.includes(channel.name) && channel.type == "category");
    let idsCanaisSemestres = canaisSemestres.map(channel => channel.id);

    let canaisDisciplinas = msg.guild.channels.cache.filter(channel => idsCanaisSemestres.includes(channel.parentID));
    let rolesDisciplinas = msg.guild.roles.cache.filter(role => arrayNomesRoles.includes(role.name));

    canaisDisciplinas.forEach(canal => canal.delete());
    canaisSemestres.forEach(canal => canal.delete());


    rolesDisciplinas.forEach(role => role.delete());

}