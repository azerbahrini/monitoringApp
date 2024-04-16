const CustomerContact = require("../../models/CustomerContact");
module.exports = async (customerContactData, customerContactId) => {
  try {
    const updatedDoc = await CustomerContact.findOneAndUpdate(
      {
        _id: customerContactId,
      },
      customerContactData,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return {
        err: { message: "CustomerContact not found" },
        status: "error",
        statusCode: 404,
      };
    }

    return {
      data: updatedDoc,
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
