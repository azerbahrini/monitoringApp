const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
      await db.collection('users').updateMany({}, {$rename: {microsoftid: 'microsoftId'}})
      logger.info('user migration worked !')
    } catch (error) {
      logger.error('user migration error: ', error)
    }
  },

  async down(db) {}
};
