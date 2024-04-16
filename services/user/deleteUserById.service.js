const User = require("../../models/User");
module.exports = async (id) => {
  try {
    // Remove user
    const deletedUser = await User.findOneAndUpdate({ _id:id },{isActive:false},{ new:true });
    if (!deletedUser) {
      return {
        err: { message: "user doesn't exist " },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: deletedUser,
      status: "success",
    };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
