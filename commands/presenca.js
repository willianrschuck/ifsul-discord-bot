exports.run = (client, msg, args) => {

    let canalDeVozDoUsuario = msg.member.voice.channel;

    if (canalDeVozDoUsuario) {

        let nomesMembrosNoCanal = msg.member.voice.channel.members.map(membro => membro.displayName);
    
        msg.channel.send('Estavam presentes: ' + nomesMembrosNoCanal.join(', '));

    } else {

        msg.reply('Você não está conectado a um canal de voz!');

    }

}