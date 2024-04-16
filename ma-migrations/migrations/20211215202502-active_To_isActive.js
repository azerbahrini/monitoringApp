const logger = require('./../../config/logger')

module.exports = {
  async up(db) {
    try {
      await db.collection('categories').updateMany({}, { $rename: { active: 'isActive' } });
      await db.collection('customers').updateMany({}, { $rename: { active: 'isActive' } });
      await db.collection('monitoringtypes').updateMany({}, { $rename: { active: 'isActive' } });
      await db.collection('roles').updateMany({}, { $rename: { active: 'isActive' } });
      await db.collection('sysclasses').updateMany({}, { $rename: { active: 'isActive' } });
      await db.collection('types').updateMany({}, { $rename: { active: 'isActive' } });
      // Adding missing isActive field
      await db.collection('clients').updateMany({}, { $set: { isActive: true } });
      await db.collection('customercontacts').updateMany({}, { $set: { isActive: true } });
      await db.collection('hosts').updateMany({}, { $set: { isActive: true } });
      await db.collection('licences').updateMany({}, { $set: { isActive: true } });
      await db.collection('monitoringacts').updateMany({}, { $set: { isActive: true } });
      await db.collection('slacontracts').updateMany({}, { $set: { isActive: true } });
      await db.collection('slas').updateMany({}, { $set: { isActive: true } });
      await db.collection('systems').updateMany({}, { $set: { isActive: true } });
      await db.collection('users').updateMany({}, { $set: { isActive: true } });
      logger.info('Migration 20211215202502-active_To_isActive completed');
    } catch (error) {
      logger.error('Migration 20211215202502-active_To_isActive failed', error);
    }
  },

  async down(db) {
  }
};
