const Client = require("../../models/Client");
const logger = require("../../config/logger");

module.exports = async (doc, id) => {
  try {
    const updatedDoc = await Client.findOneAndUpdate({ _id: id }, doc, {
      new: true,
    })
      .lean()
      .exec();
    if (!updatedDoc) {
      return {
        err: { message: "Client not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: updatedDoc, status: "success" };
  } catch (err) {
    logger.error(err);
    return { err, status: "error" };
  }
};
