const System = require("../../models/System");
const logger = require("../../config/logger");

module.exports = async (systemId) => {
  try {
    const updatedDoc = await System.findOneAndUpdate({ _id: systemId },{isActive:false}, {new: true,}).lean().exec();

    if (!updatedDoc) {
      return {
        err: { message: "System not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: updatedDoc, status: "success" };
  } catch (err) {
    //console.log(err);
    return { err, status: "error" };
  }
};