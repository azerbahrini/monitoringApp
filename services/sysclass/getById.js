//Model Object
const SysClass = require("../../models/SysClass");

module.exports = async (id) => {
  try {
    const doc = await SysClass.findOne({ _id: id }).lean().exec();
    if (!doc) {
      return {
        err: { message: "system class not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
