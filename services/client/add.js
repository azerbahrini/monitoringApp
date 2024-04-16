const Client = require("../../models/Client");


module.exports = async (doc) => {
    try {
      const document = await Client.create({ ...doc });
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  