const logger = require('./../../config/logger')

let updateArray = [];

function updateList(licence, customer) {
  try {
    let updateObject = {
      licenceId: licence,
      customerId: customer
    }

    updateArray = [...updateArray, updateObject]
    if (updateArray.length > 0) {
      return updateArray
    }

  } catch (error) {
    logger.error('An error has occured when creating liscence update list !')
  }
}

async function looper(customers) {
  let licenceIds
  let customerId
  let UR = []
  if (customers) {
    await customers.forEach(el => {
      if (el.listLicence.length > 0) {
        customerId = el._id;
        licenceIds = el.listLicence
        for (const lId of licenceIds) {
          UR = updateList(lId, customerId);
        }
      }
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for customer - licence migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {

      let customers = await db.collection('customers').find({ listLicence: { $exists: true } })
      let loop = await looper(customers)
      if (loop.length > 0) {
        db.collection('licences').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.licenceId
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
        logger.info('there are no data to migrate, no matches have been found - licence')
      }
    } catch (error) {
      logger.error('Migration error licence : ', error)
    }
  },

  async down(db) {

  }
};
