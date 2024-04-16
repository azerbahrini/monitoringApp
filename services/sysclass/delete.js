//Model Object
const SysClass = require("../../models/SysClass");

module.exports = async (id) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const docdel = await SysClass.findOneAndRemove({
      _id: id,
    });

    if (!docdel) {
      return { err: { message: "system class not found" }, status: "error" };
    }

    return { data: docdel, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
