const Role = require("../../models/Role");
module.exports = async (id) => {
  try {
    const doc = await Role.findOne({ _id: id }).populate("listModule").lean().exec();
    if (!doc) {
      return {
        err: { message: "Role not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
