const Host = require("../../models/Host");
const logger = require("../../config/logger");

module.exports = async (hostId) => {
  try {
    const deletedhost = await Host.findOneAndUpdate(
      {
        _id: hostId,
        isActive: true,
      },
      { isActive: false },
      { new: true }
    )
      .lean()
      .exec();

    if (!deletedhost) {
      return {
        status: "error",
        err: { message: "No host matched this criteria !" },
        statusCode: 404,
      };
    }

    return {
      status: "success",
      data: deletedhost,
    };
  } catch (err) {
    logger.error("Delete Error :", err);
    return { err, status: "error" };
  }
};
