const User = require("../../models/User");
const bcrypt = require("bcryptjs");
module.exports = async (firstName,lastName,email,password,phoneNumber,shift,avatar,Level,microsoftId) => {
  try {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName:firstName,
      lastName:lastName,
      email:email,
      password: hashedPassword,
      phoneNumber:phoneNumber,
      shift:shift,
      avatar:avatar,
      Level:Level,
      microsoftId:microsoftId //microsoftId
});

    if (!user) {
      return {
        err: { message: "User creation problem" },
        status: "error",
      };
    }
    return { data: user, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
