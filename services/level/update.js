const Level = require("../../models/Level");
module.exports = async (filter, doc) => {
  try {
    const updatedlevelDocument = await Level.findOneAndUpdate(filter, doc, {
      new: true,
    });
    if (!updatedlevelDocument) {
      return {
        err: { message: "Level not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return {
      data: updatedlevelDocument,
      status: "success",
    };
  } catch (err) {
    return {
      err,
      status: "error",
    };
  }
};
