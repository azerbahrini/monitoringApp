const CustomerContact = require("../../models/CustomerContact");
module.exports = async (customerContactData) => {
  try {
    const customerContact = await CustomerContact.create({
      ...customerContactData,
    });
    return {
      data: customerContact,
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
