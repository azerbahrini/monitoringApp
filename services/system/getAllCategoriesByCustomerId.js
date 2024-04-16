const System = require("../../models/System");

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
module.exports = async (customer_Id) => {
  try {
    let tab = [];
    const systemCategories = await System.find(
      {
        customer: customer_Id,
        category: { $exists: true },
        isActive:true
      },
      { category: 1, _id: 0 }
    ).populate({
      path: "category",
      model: "category",
      select: { _id: 1, category: 1 },
    });

    if (systemCategories.length === 0) {
      return {
        err: { message: "No Category exist match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }

    for (let i = 0; i < systemCategories.length; i++) {
      if (systemCategories[i].category) {
        tab.push({
          _id: systemCategories[i].category._id,
          category: systemCategories[i].category.category,
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
