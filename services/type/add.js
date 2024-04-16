const Type = require("../../models/Type");
module.exports = async (doc) => {
  try {
    const document = await Type.create({ ...doc });
    return {
      data: document,
      status: "success",
    };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
