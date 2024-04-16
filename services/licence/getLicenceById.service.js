const Licence = require("../../models/Licence");
module.exports = async (id) => {
  try {
    const doc = await Licence.findOne({ _id: id }).lean().exec();
    if (!doc) {
      return {
        err: { message: "Licence not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
