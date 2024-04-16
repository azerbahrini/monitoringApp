const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
    await db.collection('systems').updateMany({}, { $unset: { name:"" } });
    await db.collection('systems').updateMany({}, { $rename: { system: 'name' } });
    logger.info('Migration 20211220101340-systemName completed');
  } catch (error) {
    logger.error('Migration 20211220101340-systemName failed', error);
  }
  },

  async down(db) {}
};
