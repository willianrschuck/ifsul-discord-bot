const gerenciadorSalas = require('../util/gerenciador-salas')

exports.run = (client, oldVoiceState, newVoiceState) => {
    gerenciadorSalas.onVoiceStateUpdate(client, oldVoiceState, newVoiceState);
}; 