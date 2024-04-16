const Licence = require("../../models/Licence");
const Customer = require("../../models/Customer");

module.exports = async (body) => {
  try {
    const customerDocument = await Customer.create({ ...body });

    if (!customerDocument) {
      return {
        err: { message: "Customer creation problem" },
        status: "error",
      };
    }
    if (body.isActive === "true") {
      const licenceDocument = await Licence.create({
        startDate: body.startDate, endDate: body.endDate, customer: customerDocument._id
      });

      if (!licenceDocument) {
        return {
          err: { message: "Licence creation problem" },
          status: "error",
        };
      }
    }
    return { data: customerDocument, status: "success" };
  } catch (err) {
    return { err: err, status: "error" };
  }
};
