const logger = require('./../../config/logger')

let updateArray = [];

function updateList(map, system) {
  try {
    let updateObject = {
      mapId: map,
      systemId: system
    }

    updateArray = [...updateArray, updateObject]

    if (updateArray.length > 0) {
      return updateArray
    }

  } catch (error) {
    logger.error('An error has occured when creating Map update list !')
  }
}

async function looper(systems) {
  let mapIds
  let systemId
  let UR = []
  if (systems) {
    await systems.forEach(el => {
      if (el.listMap.length > 0) {
        systemId = el._id;
        mapIds = el.listMap
        for (const mId of mapIds) {
          UR = updateList(mId, systemId);
        }
      }
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for map - system migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {

      let systems = await db.collection('systems').find({ listMap: { $exists: true } })
      let loop = await looper(systems)
      if (loop.length > 0) {
        db.collection('maps').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.mapId
                },
                update: {
                  $set: {
                    system: h.systemId
                  }
                },
                upsert: true
              }
            }
          })
        )
      } else {
        logger.info('there are no data to migrate, no matches have been found - map')
      }
    } catch (error) {
      logger.error('Migration error MAP : ', error)
    }
  },

  async down(db) {
  }
};
