const User = require("../../models/User");
module.exports = async (id,reqStatus) => {
  try {
    const UserDocument = await User.findOneAndUpdate(
      {
        _id: id,
      },
     {status : reqStatus},
      { new: true }
    )
    if (!UserDocument) {
      return {
        err: { message: "User not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: UserDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
