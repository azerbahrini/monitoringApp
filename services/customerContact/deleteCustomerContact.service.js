const CustomerContact = require("../../models/CustomerContact");

module.exports = async (customerContactId) => {
  try {
    const docdel = await CustomerContact.findOneAndUpdate(
      {
        _id: customerContactId,
      },
      { isActive: false },
      { new: true }
    );
    
    if (!docdel) {
      return {
        err: { message: "CustomerContact not found" },
        status: "error",
        statusCode: 404,
      };
    }

    return {
      data: docdel,
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
