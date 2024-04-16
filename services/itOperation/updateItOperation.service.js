const ItOperation = require("../../models/ItOperation");
module.exports = async (id,update,returnNew) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const doc = await ItOperation.findOneAndUpdate(
      {
        _id: id
      },
      update,
      { new: returnNew }
    )
    .lean()
    .exec()
    
    if (!doc) {
      return {
        err: { message: "ItOperation not found." },
        status: "error",
        statusCode: 404,
      };
    }

    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
