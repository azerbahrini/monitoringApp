const bcrypt = require("bcryptjs");

const User = require("../../models/User");
module.exports = async (psw, userId) => {
  try {
    
    const user = await User.findById(userId);
   
    if (!user) {
      return {
        err: { message: "user not found" },
        status: "error",
        statusCode: 404,
      };
    }
    const salt = await bcrypt.genSalt(10);
    const newPswHashed = await bcrypt.hash(psw.newPassword, salt);
    const isMatch = await bcrypt.compare(psw.currentPassword, user.password);
    
    if (!isMatch) {
      return {
        err: { message: "Incorrect password" },
        status: "error",
        statusCode: 403,
      };
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { password: newPswHashed },
        { new: true }
      )
        .lean()
        .exec();
      return {
        data: updatedUser,
        status: "success",
      };
    }
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
