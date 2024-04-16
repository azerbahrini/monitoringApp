const Role = require("../../models/Role");
module.exports = async (id) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const docdel = await Role.findOneAndUpdate(
      {
        _id: id,
        isActive:true
      },
      {isActive:false},
      { new: true }
    )
    .lean()
    .exec()
    
    if (!docdel) {
      return {
        err: { message: "Role not found." },
        status: "error",
        statusCode: 404,
      };
    }

    return { data: docdel, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
