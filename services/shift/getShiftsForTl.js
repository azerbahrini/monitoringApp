const Shift = require("../../models/Shift");

module.exports = async (docParam) => {
  try {
    const doc = await Shift.find(
      {
        $or: docParam
      }
    )
      .lean()
      .exec();
    if (doc.length===0) {
      return {
        err: { message: "Shift not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data:doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
