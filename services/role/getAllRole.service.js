const Role = require("../../models/Role");
module.exports = async (paginate,page, size,conditions , searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size,
      pagination: paginate
    }
    const docs = await Role.paginate(conditions, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
