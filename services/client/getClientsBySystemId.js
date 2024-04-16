const Client = require("../../models/Client");
const logger = require("../../config/logger");
module.exports = async (sysId , searchValue) => {
  try {
    const client = await Client.find({
      system: sysId,
      clientNumber: { $regex: searchValue ? searchValue : ".", $options: "i" },
      isActive: true,
    });
    if (!client) {
      return {
        err: { message: "No  Client match this criteria !" },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: client,
      status: "success",
    };
  } catch (err) {
    logger.error("Get by System Error :", err);
    return { err, status: "error" };
  }
};
  