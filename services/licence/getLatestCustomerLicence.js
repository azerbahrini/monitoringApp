//Get The Latest Customer Licence By Expiration Date

const Licence = require("../../models/Licence");
const logger = require("../../config/logger");
const moment = require("moment");
module.exports = async (customer_Id) => {
  try {
    let now = new Date(moment()).toISOString();
    const licence = await Licence.findOne({
      $and: [
        { endDate: { $gte: now } },
        { startDate: { $lte: now } },
        {
          customer: customer_Id,
        },
        { isActive: true },
      ],
    },
    'startDate endDate'
    )

    if (!licence) {
      return {
        err: {
          message: "No Licence Exist with this Customer Id:",
          customer_Id,
        },
        status: "error",
        statusCode: 404,
      };
    }



    return {
      data: licence,
      status: "success",
    };
  } catch (err) {
    logger.error("Error occur while Getting Licence By Customer Id :", err);
    return { err, status: "error" };
  }
};
