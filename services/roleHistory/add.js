const RoleHistory = require("../../models/RoleHistory");


module.exports = async (doc) => {
    try {
      const document = await RoleHistory.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  