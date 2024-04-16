const Client = require('../../models/Client')


module.exports = async (id) => {
    try {
      const doc = await Client.findOne({ _id: id }).lean().exec();
      if (!doc) {
        return {
          err: { message: "Client not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  