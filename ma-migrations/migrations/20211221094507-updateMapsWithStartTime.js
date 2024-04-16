const logger = require('./../../config/logger');
const moment = require('moment');
const stringToMinutes = require('./../../utils/stringToMinutes');
module.exports = {
  async up(db) {

async function looper(maps) {
  const mapsToUpdate = [];
  if (maps) {
    await maps.forEach(async (item) => {
      const system = await db.collection('systems').find({ _id: item.system });

      const customer = await db
        .collection('customers')
        .find({ _id: system.customer, firstReport: { $exists: true } });

      startTime = stringToMinutes(moment(customer.fisrtReport).format('HH:mm'));
      mapsToUpdate.push({ mapId: item._id, startTime: startTime });
    });

    if (mapsToUpdate.length > 0) {
      return mapsToUpdate;
    } else {
      logger.info('no matches found for maps - maps migration');
      return [];
    }
  }
}

    try {
      const maps = await db
        .collection('maps')
        .find({ startTime: { $exists: false } });
      const loop = await looper(maps);

      if (loop.length > 0) {
        db.collection('maps').bulkWrite(
          loop.map((item) => ({
            updateOne: {
              filter: {
                _id: item.mapId
              },
              update: {
                $set: {
                  startTime: item.startTime
                }
              },
              upsert: true
            }
          }))
        );
      }
    } catch (error) {
      logger.error('Migration error : ', error);
    }
  },
  async down() {}
};
