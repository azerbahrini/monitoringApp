const User = require("../../models/User");

module.exports = async (userData, id) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { ...userData },
      { new: true }
    )
      .lean()
      .exec();

    return {
      data: updatedUser,
      status: 'success'
    };
  } catch (err) {
    return {
      err,
      status: 'error'
    };
  }
};
