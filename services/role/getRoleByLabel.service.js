const Role = require("../../models/Role");


module.exports = async (label) => {
    try {
      const doc = await Role.findOne({ label: label}).lean().exec();
      if (!doc) {
        return {
          err: { message: "Role not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  