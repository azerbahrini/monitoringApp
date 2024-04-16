const Type = require("../../models/Type");
module.exports = async (id) => {
  try {
    const doc = await Type.findOne({ _id: id.toString() }).lean().exec();

    if (!doc) {
      return {
        err: { message: "Type not found." },
        status: "error",
        statusCode: 404,
      };
    }

    return { data: doc, status: "success" };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
