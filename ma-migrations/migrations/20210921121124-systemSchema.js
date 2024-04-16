const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
      db.collection('systems').updateMany({}, {
        $unset: {
          listHost: "",
          listMap: "",
          listClient: "",
          listItOperation: ""
        }
      })
      logger.info('updated systems schema !')
    } catch (error) {
      logger.error('Migration error System Schema : ', error)
    }
  },

  async down(db) {
  }
};
