const SlaContract = require("../../models/SlaContract");
module.exports = async (id, body) => {
  try {
    const SlaContractDocument = await SlaContract.findOneAndUpdate(
      {
        _id: id,
        isActive:true
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!SlaContractDocument) {
      return {
        err: { message: "SlaContract not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: SlaContractDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
