const logger = require('./../../config/logger')
module.exports = {
  async up(db) {
    try {
      db.collection('types').createIndex({
        type: 1,
        active: 1
      }, {
        unique: true
      })
      logger.info('Type Migration Complete !')
    } catch (error) {
      logger.error('Migration Error - Type : ', error)
    }
  },

  async down(db) {
  }
};
