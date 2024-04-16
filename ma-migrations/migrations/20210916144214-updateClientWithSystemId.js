const logger = require('./../../config/logger')

let updateArray = [];

function updateList(client, system) {
  try {
  let updateObject = {
    clientId: client,
    systemId: system
  }

  updateArray = [...updateArray, updateObject]

  if (updateArray.length > 0) {
    return updateArray
  }

} catch (error) {
  logger.error('An error has occured when creating client update list !')
}
}

async function looper(systems) {
  let clientIds
  let systemId
  let UR = []
  if (systems) {
    await systems.forEach(el => {
      if (el.listClient.length > 0) {
        systemId = el._id;
        clientIds = el.listClient
        for (const cId of clientIds) {
          UR = updateList(cId, systemId);
        }
      }
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for client - system migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {
      let systems = await db.collection('systems').find({ listClient: { $exists: true } })
      let loop = await looper(systems)
      if (loop.length > 0) {
        db.collection('clients').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.clientId
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
        logger.info('there are no data to migrate, no matches have been found - client')
      }
    } catch (error) {
      logger.error('Migration error Client : ', error)
    }
  },

  async down(db) {

  }
};
