const Host = require("../../models/Host");
const logger = require("../../config/logger");

module.exports = async (hostId, hostData) => {
  try {
    const updatedhost = await Host.findOneAndUpdate(
      {
        _id: hostId,
        isActive: true,
      },
      hostData,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedhost) {
      return {
        status: "error",
        err: { message: "No host matched this criteria !" },
        statusCode: 404,
      };
    }

    return {
      status: "success",
      data: updatedhost,
    };
  } catch (err) {
    logger.error("Update Error :", err);
    return { err, status: "error" };
  }
};
