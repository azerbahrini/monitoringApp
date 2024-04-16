const logger = require('./../../config/logger')

let updateArray = [];

function updateList(slaContract, customer) {
  try {
    let updateObject = {
      slaContractId: slaContract,
      customerId: customer
    }

    updateArray = [...updateArray, updateObject]

    if (updateArray.length > 0) {
      return updateArray
    }

  } catch (error) {
    logger.error('An error has occured when creating SlaContract update list !')
  }
}

async function looper(customers) {
  let slaContractIds
  let customerId
  let UR = []
  if (customers) {
    await customers.forEach(el => {
      if (el.listSlaContract.length > 0) {
        customerId = el._id;
        slaContractIds = el.listSlaContract
        for (const cId of slaContractIds) {
          UR = updateList(cId, customerId);
        }
      }
    });
    if ( UR.length > 0 ) {
      return UR
    } else {
      logger.info('no matches found for customer - slaContract migration')
      return []
    }
  }
}
module.exports = {
  async up(db) {
    try {

      let customers = await db.collection('customers').find({ listSlaContract: { $exists: true } })
      let loop = await looper(customers)
      if (loop.length > 0) {
        db.collection('slacontracts').bulkWrite(
          loop.map(h => {
            return {
              updateOne: {
                filter: {
                  _id: h.slaContractId
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
        logger.info('there are no data to migrate, no matches have been found - sla contract')
      }
    } catch (error) {
      logger.error('Migration error slaContract : ', error)
    }
  },

  async down(db) {

  }
};
