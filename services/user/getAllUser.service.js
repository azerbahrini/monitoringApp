const User = require("../../models/User");
module.exports = async (populateWith = "", page = 1, size = 1) => {
  try {
    let options = {
      offset: page * size,
      limit: size,
      populate: populateWith,
      lean: false,
    };
    const u = await User.paginate({}, options);
    
    return {
      data: u,
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
