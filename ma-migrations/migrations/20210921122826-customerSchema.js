const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
      db.collection('customers').updateMany({}, {
        $unset: {
          listSlaContract: "",
          listLicence: "",
          listSystem: "",
        }
      })
      logger.info('updated customers schema !')
    } catch (error) {
      logger.error('Migration error customers Schema : ', error)
    }
  },

  async down(db) {
  }
};
