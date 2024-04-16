const SlaContract = require("../../models/SlaContract");

module.exports = async (doc) => {
  try {
    const slaContractDocument = await SlaContract.create({ ...doc });

    if (!slaContractDocument) {
      return {
        err: { message: "SlaContract creation problem" },
        status: "error",
      };
    }

    return { data: slaContractDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
