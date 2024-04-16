const System = require("../../models/System");
const logger = require("../../config/logger");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
module.exports = async (customerId, typeId) => {
  try {
    let tab = [];
    const systemCateg = await System.find(
      {
        customer: customerId,
        type: typeId,
        category: { $exists: true },
        isActive:true
      },
      { category: 1, _id: 0 }
    ).populate({
      path: "category",
      select: "category",
    });

    if (systemCateg.length === 0) {
      return {
        err: { message: "No  Category match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }
    for (let i = 0; i < systemCateg.length; i++) {
      if (systemCateg[i].category) {
        tab.push({
          _id: systemCateg[i].category._id,
          category: systemCateg[i].category.category,
        });
      }
    }
    const uniqueList = getUniqueListBy(tab, "_id");

    return {
      data: uniqueList,
      status: "success",
    };
  } catch (err) {
    logger.error("Get Categories by Customer ID and Type ID Error :", err);
    return { err, status: "error" };
  }
};
