const logger = require('./../../config/logger')

let updateArray = [];

function updateList(host, system) {
  try {
    let updateObject = {
      hostId: host,
      systemId: system
    }

    updateArray = [...updateArray, updateObject]

    if (updateArray.length > 0) {
      return updateArray
    }

  } catch (error) {
    logger.error('An error has occured when creating host update list !')
  }
}

async function looper(systems) {
  let hostIds
  let systemId
  let UR = []
  if (systems) {
    await systems.forEach(el => {
      if (el.listHost.length > 0) {
        systemId = el._id;
        hostIds = el.listHost
        for (const hId of hostIds) {
          UR = updateList(hId, systemId);
        }
      }
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for host - system migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {

      let systems = await db.collection('systems').find({ listHost: { $exists: true } })
      let loop = await looper(systems)
      if (loop.length > 0) {
        db.collection('hosts').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.hostId
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
        logger.info('there are no data to migrate, no matches have been found - host')
      }
    } catch (error) {
      logger.error('Migration error HOST : ', error)
    }
  },

  async down(db) {
  },


};
