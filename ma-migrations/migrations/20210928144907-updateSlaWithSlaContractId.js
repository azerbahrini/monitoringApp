const logger = require("./../../config/logger");

let updateArray = [];

function updateList(sla, slaContract) {
  try {
    let updateObject = {
      slaId: sla,
      slaContractId: slaContract,
    };

    updateArray = [...updateArray, updateObject];

    if (updateArray.length > 0) {
      return updateArray;
    }
  } catch (error) {
    logger.error("An error has occured when creating sla update list !");
  }
}
async function looper(slaContracts) {
  let slaIds;
  let slaContractId;
  let UR = [];

  if (slaContracts) {
    await slaContracts.forEach((el) => {
      if (el.listSla.length > 0) {
        slaContractId = el._id;
        slaIds = el.listSla;
        for (const sId of slaIds) {
          UR = updateList(sId, slaContractId);
          logger.debug("Im here UR", UR);
        }
      }
    });

    if (UR.length > 0) {
      return UR;
    } else {
      logger.info("no matches found for sla - slaContract migration");
      return [];
    }
  }
}

module.exports = {
  async up(db) {
    try {
    let slaContracts = await db.collection('slacontracts').find({ listSla: { $exists: true } });
    let loop = await looper(slaContracts);
    if (loop.length > 0) {
      db.collection('slas').bulkWrite(
        loop.map((h) => {
          return {
            updateOne: {
              filter: {
                _id: h.slaId,
              },
              update: {
                $set: {
                  slaContract: h.slaContractId,
                },
              },
              upsert: true,
            },
          };
        })
      );
    } else {
      logger.info(
        "there are no data to migrate, no matches have been found - sla"
      );
    }
    } catch (error) {
      logger.error('Migration error sla : ', error)
      
    }
    
  },

  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
