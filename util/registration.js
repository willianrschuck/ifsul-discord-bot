module.exports = (()=>{

    let _listen = {};

    return {

        listen(channel, callback) {
            _listen[channel.id] = {
                callback
            };
        },

        unlisten(channel) {
            delete _listen[channel.id];
        },

        handleMessage(msg) {
            const callback = _listen[msg.channel.id]?.callback;
            if (callback) {
                callback(msg);
            }
        }

    }

})();