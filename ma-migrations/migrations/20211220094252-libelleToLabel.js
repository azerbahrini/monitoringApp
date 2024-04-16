const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
    await db.collection('customers').updateMany({}, { $rename: { libelle: 'label' } });
    logger.info('Migration 20211220094252-libelleToLabel completed');
  } catch (error) {
    logger.error('Migration 20211220094252-libelleToLabel failed', error);
  }
  },

  async down(db) {}
};
