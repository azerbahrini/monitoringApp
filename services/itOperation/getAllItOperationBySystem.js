const ItOperation = require("../../models/ItOperation");
const logger = require("../../config/logger");
module.exports = async (sysId, page, size) => {
  try {
    options = {
      offset: page * size,
      limit: size,
    };
    const itOperation = await ItOperation.paginate({ system: sysId }, options);
    if (itOperation.totalDocs === 0) {
      return {
        err: { message: "No ItOperation Exist with this system Id:", sysId },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: itOperation,
      status: "success",
    };
  } catch (err) {
    logger.error("Error occur while Getting ItOperation By System Id :", err);
    return { err, status: "error" };
  }
};
