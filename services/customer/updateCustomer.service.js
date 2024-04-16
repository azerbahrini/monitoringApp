const Customer = require("../../models/Customer");
module.exports = async (id, body) => {
  try {
    const CustomerDocument = await Customer.findOneAndUpdate(
      {
        _id: id,
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!CustomerDocument) {
      return {
        err: { message: "Customer not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: CustomerDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
