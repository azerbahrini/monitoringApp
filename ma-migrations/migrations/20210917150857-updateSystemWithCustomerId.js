const logger = require('./../../config/logger')

let updateArray = [];

function updateList(system, customer) {
  try {
    let updateObject = {
      systemId: system,
      customerId: customer
    }

    updateArray = [...updateArray, updateObject]
    if (updateArray.length > 0) {
      return updateArray
    }

  } catch (error) {
    logger.error('An error has occured when creating System update list !')
  }
}

async function looper(customers) {
  let systemIds
  let customerId
  let UR = []
  if (customers) {
    await customers.forEach(el => {
      if (el.listSystem.length) {
        customerId = el._id;
        systemIds = el.listSystem
        for (const sId of systemIds) {
          UR = updateList(sId, customerId);
        }
      } 
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for customer - system migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {

      let customers = await db.collection('customers').find({ listSystem: { $exists: true } })
      let loop = await looper(customers)
      if (loop.length > 0) {
        db.collection('systems').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.systemId
                },
                update: {
                  $set: {
                    customer: h.customerId
                  }
                },
                upsert: true
              }
            }
          })
        )
      } else {
        logger.info('there are no data to migrate, no matches have been found - system')
      }
    } catch (error) {
      logger.error('Migration error licence : ', error)
    }
  },

  async down(db) {

  }
};
