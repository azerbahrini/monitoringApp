const Host = require("../../models/Host");


module.exports = async (doc) => {
    try {
      const document = await Host.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  