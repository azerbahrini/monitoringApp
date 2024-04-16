//Model Object
const SysClass = require("../../models/SysClass");

module.exports = async (doc) => {
  try {
    const document = await SysClass.create({ ...doc });
    return { data: document, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
