const logger = require("../../config/logger");
const Customer = require("../../models/Customer");
const activeLicence = require("../../services/licence/getLatestCustomerLicence");

module.exports = async (id, toPopulate) => {
  try {
    const doc = await Customer.findOne({ _id: id })
      .populate(toPopulate)
      .lean()
      .exec();
    const ActiveLicence = await activeLicence(id);
    if (!doc) {
      return {
        err: { message: "Customer not found." },
        status: "error",
        statusCode: 404,
      };
    }

    let result = {
      customer: {...doc,activeLicence: ActiveLicence.data}
    };

    return { data:{...doc,activeLicence: ActiveLicence.data}, status: "success" };
  } catch (err) {
    logger.error(err)
    return { err, status: "error" };
  }
};
