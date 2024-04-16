const CustomerContact = require("../../models/CustomerContact");
module.exports = async (customerContactId) => {
  try {
    const doc = await CustomerContact.findOne({ _id: customerContactId })
      .lean()
      .exec();

    if (!doc) {
      return {
        err: { message: "CustomerContact not found" },
        status: "error",
        statusCode: 404,
      };
    }

    return {
      data: doc,
      status: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error",
    };
  }
};
