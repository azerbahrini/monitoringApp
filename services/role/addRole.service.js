const Role = require("../../models/Role");
module.exports = async (doc) => {
  try {
    const document = await Role.create({ ...doc });
    return { data: document, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
