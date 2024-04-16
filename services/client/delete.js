const Client = require("../../models/Client");
const logger = require("../../config/logger");

module.exports = async (clientId) => {
  try {
    const deletedClient = await Client.findOneAndUpdate(
      { _id: clientId },
      { isActive: false },
      { new: true }
    )
      .lean()
      .exec();

    if (!deletedClient) {
      return {
        status: "error",
        err: { message: "No client matched this criteria !" },
        statusCode: 404,
      };
    }

    return {
      status: "success",
      data: deletedClient,
    };
  } catch (err) {
    logger.error("Delete Error :", err);
    return { err, status: "error" };
  }
};
