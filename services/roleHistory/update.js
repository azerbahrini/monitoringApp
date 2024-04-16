const RoleHistory = require('../../models/RoleHistory')
const logger = require("../../config/logger");

module.exports = async (doc, id) => {
  try {

    const updatedDoc = await RoleHistory.findOneAndUpdate({ _id: id }, doc, {new: true,}).lean().exec();

    if (!updatedDoc) {
      return {
        err: { message: "RoleHistory not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: updatedDoc, status: "success" };
  } catch (err) {
    logger.error(
      err.message
    );
    return { err, status: "error" };
  }
};
