const RoleHistory = require('../../models/RoleHistory')


module.exports = async (id) => {
    try {
      const doc = await RoleHistory.findOne({ _id: id }).lean().exec();
      if (!doc) {
     
        return {
          err: { message: "RoleHistory not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
