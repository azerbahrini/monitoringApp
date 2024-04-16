const Category = require("../../models/Category");


module.exports = async (doc) => {
    try {
      const document = await Category.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  