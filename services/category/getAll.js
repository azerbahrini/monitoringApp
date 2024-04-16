const Category = require("../../models/Category");

module.exports = async (page, size,active , searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    findFilter = {
      ...active,
      category: { $regex: searchValue ? searchValue : ".", $options: "i" },
    };
    const docs = await Category.paginate(findFilter, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
