const ItOperation = require("../../models/ItOperation");
const System = require("../../models/System");

module.exports = async (doc) => {
  try {
    const itOperationDocument = await ItOperation.create({ ...doc });

    if (!itOperationDocument) {
      return {
        err: { message: "ItOperation creation problem" },
        status: "error",
      };
    }

    return { data: itOperationDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
