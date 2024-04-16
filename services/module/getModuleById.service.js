const Module = require("../../models/Module");
module.exports = async (id,toPopulate) => {
  try {
    
    const doc = await Module.findOne({ _id: id })
    .populate(toPopulate)
    .lean().exec();
    if (!doc) {
      return {
        err: { message: "Module not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
