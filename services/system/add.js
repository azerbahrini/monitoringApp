const System = require("../../models/System");


module.exports = async (doc) => {
    try {
      const document = await System.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  