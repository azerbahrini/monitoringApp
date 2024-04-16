const Module = require("../../models/Module");
module.exports = async (doc) => {
  try {
    const document = await Module.create({ ...doc });
    return { data: document, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
