const { listen, unlisten } = require("../util/registration")

exports.run = async (client, msg, args) => {

    let canalRegistro = await msg.guild.channels.create(`registro-${msg.member.user.username}`, {
        type: "text",
        permissionOverwrites: [
            {
                id: msg.guild.roles.everyone,
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
                id: msg.member.user,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }
        ],
    });

    let state = 'setname';

    canalRegistro.send("Bem vindo ao servidor da ciência da computação do IFSul - PF!");
    canalRegistro.send("Para continuar, informe seu nome!");

    listen(canalRegistro, msg => {

        if (msg.author.bot) return;

        switch (state) {

            case 'setname':

                const nome = msg.content;

                if (nome.length > 32) {
                    msg.channel.send("Não é possível registrar um nome com mais de 32 caracteres");
                }

                msg.member.setNickname(nome);
                msg.channel.send(`Seu nome foi configurado como "${nome}", está correto? (s/n)`);
                state = 'verifyname';

                break;
            
            case 'verifyname':

                const res = msg.content.toLowerCase();

                if (res == 's') {
                    msg.channel.send("Obrigado por se registrar!")
                    state = 'success';
                    unlisten(canalRegistro);
                    setTimeout(() => canalRegistro.delete(), 30000);
                }

                if (res == 'n') {
                    msg.channel.send("Informe seu nome novamente")
                    state = 'setname';
                }

                break;
                
        }
    });

}