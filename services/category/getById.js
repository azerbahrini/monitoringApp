const Category = require("../../models/Category");


module.exports = async (id) => {
    try {
      const doc = await Category.findOne({ _id: id }).lean().exec();
      if (!doc) {
        return {
          err: { message: "Category not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  