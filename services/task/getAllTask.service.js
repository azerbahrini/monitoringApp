//Model Object
const Task = require("../../models/Task");

module.exports = async (page, size) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    const docs = await Task.paginate({}, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
