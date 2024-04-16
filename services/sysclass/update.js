//Model Object
const SysClass = require("../../models/SysClass");

module.exports = async (filter, doc) => {
  try {
    if (!filter._id) {
      return {
        err: { message: "missing ID" },
        statusCode: 404,
        status: "error",
      };
    }
    const systemClassDocument = await SysClass.findOneAndUpdate(filter, doc);
    if (!systemClassDocument) {
      return {
        status: "error",
        statusCode: 404,
        err: { message: "system class not found" },
      };
    }
    const updatedSystemClassDocument = await SysClass.findOne(filter);
    return { data: updatedSystemClassDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
