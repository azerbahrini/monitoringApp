const logger = require('./../../config/logger');
const moment = require('moment');
const stringToMinutes = require('./../../utils/stringToMinutes')

async function looper(maps) {
  let mapId
  let startTime
  const UR = []
  if (maps) {
    await maps.forEach(el => {
      mapId = el._id;
      startTime = stringToMinutes(moment(el.startTime).format('HH:mm'))
      const updateObject = {
        map: mapId,
        start: startTime
      }
        UR.push(updateObject)
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for maps - maps migration')
      return []
    }
  }
}

module.exports = {
  async up(db) {
    try {
      const maps = await db.collection('maps').find({ startTime: { $exists: true } });
      const loop = await looper(maps);
      if (loop.length > 0) {
        db.collection('maps').bulkWrite(
          loop.map(m => ({
              updateOne: {
                filter: {
                  _id: m.map
                },
                update: {
                  $set: {
                    startTime: m.start
                  }
                },
                upsert: true
              }
            }))
        )
      } else {
        logger.info('there are no data to migrate, no matches have been found - MAP')
      }
    } catch (error) {
      logger.error('Migration error maps start time convertion to number : ', error)
    }
  },

  async down(db) {}
};
