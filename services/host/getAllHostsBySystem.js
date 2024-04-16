const Host = require("../../models/Host");
const logger = require("../../config/logger");

module.exports = async (sysId , searchValue) => {
  try {
    const host = await Host.find({
      system: sysId,
      host : { $regex: searchValue ? searchValue : ".", $options: "i" },
      isActive: true,
    });
    if (!host) {
      return {
        err: { message: "No Host match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: host,
      status: "success",
    };
  } catch (err) {
    logger.error("Get by System Error :", err);
    return { err, status: "error" };
  }
};
