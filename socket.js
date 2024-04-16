let io;
const logger = require("./config/logger");

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer ,{
            cors: {
              origin: '*',
            }
          })
        return io;
    },

    getIO: () => {
        if (!io) {
            logger.error('Socket.io is not initialized !')
        }
        return io;
    }
}