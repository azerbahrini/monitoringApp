const Licence = require("../../models/Licence");
module.exports = async (id, body) => {
  try {
    const LicenceDocument = await Licence.findOneAndUpdate(
      {
        _id: id,
        isActive:true
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!LicenceDocument) {
      return {
        err: { message: "Licence not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: LicenceDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
