const Category = require("../../models/Category");

module.exports = async (filter, doc) => {
    try {
      if (!filter._id) {
        return {
          err: { message: "missing ID" },
          statusCode: 404,
          status: "error",
        };
      }
      const categDoc = await Category.findOneAndUpdate(filter, doc);
      if (!categDoc) {
        return {
          status: "error",
          statusCode: 404,
          err: { message: "category not found" },
        };
      }
      const updatedCategoryDoc = await Category.findOne(filter);
      return { data: updatedCategoryDoc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  