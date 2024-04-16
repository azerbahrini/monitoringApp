const System = require("../../models/System");
const logger = require("../../config/logger");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
module.exports = async (customer_Id) => {
  try {
    let tab = [];
    const systemTypes = await System.find(
      {
        customer: customer_Id,
        type: { $exists: true },
        isActive:true
      },
      { type: 1, _id: 0 }
    ).populate({
      path: "type",
      select: "type",
    });

    if (systemTypes.length === 0) {
      return {
        err: { message: "No  Type match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }
    for (let i = 0; i < systemTypes.length; i++) {
      if (systemTypes[i].type) {
        tab.push({
          _id: systemTypes[i].type._id,
          type: systemTypes[i].type.type,
        });
      }
    }
    const uniqueList = getUniqueListBy(tab, "_id");

    return {
      data: uniqueList,
      status: "success",
    };
  } catch (err) {
    logger.error("Get types by Customer ID Error :", err);
    return { err, status: "error" };
  }
};
