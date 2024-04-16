const Module = require("../../models/Module");

module.exports = async (id) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const docdel = await Module.findOneAndRemove({
      _id: id,
    });

    if (!docdel) {
      return { err: { message: "Module not found" }, status: "error" };
    }

    return { data: docdel, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
