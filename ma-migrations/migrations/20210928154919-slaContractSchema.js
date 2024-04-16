const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
      db.collection('slacontracts').updateMany({}, {
        $unset: {
          listSla:""
        }
      })
      logger.info('updated sla contracts schema !')
    } catch (error) {
      logger.error('Migration error sla contracts Schema : ', error)
    }
  },

  async down(db) {
  }
};
