const Customer = require("../../models/Customer");
module.exports = async (populateWith, paginate ,page, size, searchValue, isActiveFilter) => {
  try {
    const options = {
      offset: page * size,
      limit: size,
      pagination: paginate ==="true",
      populate: populateWith,
    };
    const conditions = {
      ...isActiveFilter,
      label: { $regex: searchValue ? searchValue : ".", $options: "i" },
    };
    const docs = await Customer.paginate(conditions, options);

    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
