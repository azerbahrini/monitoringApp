const Type = require("../../models/Type");
module.exports = async (filter, doc) => {
  try {
    const document = await Type.findOneAndUpdate(filter, doc);

    if (!document) {
      return {
        err: { message: "Type not found." },
        status: "error",
        statusCode: 404,
      };
    }

    const updatedDocument = await Type.findOne(filter);

    return { data: updatedDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
