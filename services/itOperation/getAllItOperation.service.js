const ItOperation = require("../../models/ItOperation");

module.exports = async (conditions,options) => {
  try {
    const docs = await ItOperation.paginate(conditions, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
