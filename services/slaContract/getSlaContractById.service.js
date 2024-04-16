const SlaContract = require("../../models/SlaContract");
module.exports = async (id, toPopulate) => {
  try {

    const doc = await SlaContract.findOne({ _id: id, isActive: true }, 'isActive listSla customer startDate endDate class')
      .populate(toPopulate)
      .lean().exec();
    if (!doc) {
      return {
        err: { message: "SlaContract not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
