const System = require("../../models/System");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
module.exports = async (customer_Id, category_Id) => {
  try {
    let tab = [];
    const systemTypes = await System.find(
      {
        customer: customer_Id,
        category: category_Id,
        type: { $exists: true },
      },
      { type: 1, _id: 0 }
    ).populate({
      path: "type",
      select: { _id: 1, type: 1 },
    });

    if (systemTypes.length === 0) {
      return {
        err: { message: "No Types match this criteria !" },
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
    return { err, status: "error" };
  }
};
