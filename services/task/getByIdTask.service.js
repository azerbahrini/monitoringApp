//Model Object
const Task = require("../../models/Task");

module.exports = async (id) => {
  try {
    const doc = await Task.findOne({ _id: id }).populate({
      path: 'system', select: 'name'
    }).lean().exec();
    if (!doc) {
      return {
        err: { message: "task not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
