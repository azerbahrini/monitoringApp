const Host = require("../../models/Host");
const logger = require("../../config/logger");

module.exports = async (hostId) => {
  try {
    const host = await Host.findOne({
      _id: hostId,
      isActive: true,
    })
      .lean()
      .exec();
    if (!host) {
      return {
        err: { message: "No Hosts match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: host,
      status: "success",
    };
  } catch (err) {
    logger.error("Get by ID Error :", err);
    return { err, status: "error" };
  }
};
