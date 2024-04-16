const Sla = require("../../models/Sla");
const System = require("../../models/System");

module.exports = async (doc) => {
  try {
    const slaDocument = await Sla.create({ ...doc });

    if (!slaDocument) {
      return {
        err: { message: "Sla creation problem" },
        status: "error",
      };
    }

    return { data: slaDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
