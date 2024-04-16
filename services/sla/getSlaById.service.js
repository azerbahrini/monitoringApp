const Sla = require("../../models/Sla");
module.exports = async (id) => {
  try {
    
    const doc = await Sla.findOne({ _id: id }).lean().exec();
    if (!doc) {
      return {
        err: { message: "Sla not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
