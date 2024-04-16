const Sla = require("../../models/Sla");
module.exports = async (id, body) => {
  try {
    const SlaDocument = await Sla.findOneAndUpdate(
      {
        _id: id,
        isActive:true
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!SlaDocument) {
      return {
        err: { message: "Sla not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: SlaDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
