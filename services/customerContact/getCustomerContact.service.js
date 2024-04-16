const CustomerContact = require("../../models/CustomerContact");
module.exports = async (page, size) => {
  try {
    let options = {
      offset: page * size,
      limit: size,
      lean: true,
    };
  
    const docs = await CustomerContact.paginate({isActive: true}, options);
    return {
      data: docs,
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
