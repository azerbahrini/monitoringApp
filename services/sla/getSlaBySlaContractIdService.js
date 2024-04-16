const Sla = require("../../models/Sla");
const logger = require("../../config/logger");
const ObjectId = require("mongodb").ObjectId;

module.exports = async (slaContract_Id, page, size, searchValue) => {
  try {
    const options = {
      offset: page * size,
      limit: size
    };
    const myArray = searchValue?.split(' ');
    const searchArray = [
      {
        $or: [
          {
            kpi: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            unity: {
              $regex: '',
              $options: 'i'
            }
          },
          {
            desc: {
              $regex: '',
              $options: 'i'
            }
          }
        ]
      }
    ];
    myArray?.map((searchFragment) => {
      searchArray.push({
        $or: [
          {
            kpi: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            unity: {
              $regex: searchFragment,
              $options: 'i'
            }
          },
          {
            desc: {
              $regex: searchFragment,
              $options: 'i'
            }
          }
        ]
      });
    });

    const sla = await Sla.paginate(
      {
        isActive: true,
        slaContract: new ObjectId(slaContract_Id), 
        $and: searchArray
      },
      options
    );

    if (sla.totalDocs === 0) {
      return {
        err: {
          message: `No Sla Exist with this slaContract Id:${slaContract_Id}`,
        },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: sla,
      status: "success",
    };
  } catch (err) {
    logger.error("Error occur while Getting Sla By slaContract Id :", err);
    return { err, status: "error" };
  }
};
