const Role = require("../../models/Role");
module.exports = async (id, body) => {
  try {
    const RoleDocument = await Role.findOneAndUpdate(
      {
        _id: id,
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!RoleDocument) {
      return {
        err: { message: "Role not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: RoleDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
