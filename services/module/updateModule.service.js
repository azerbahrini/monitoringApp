const Module = require("../../models/Module");
module.exports = async (id, body) => {
  try {
    const ModuleDocument = await Module.findOneAndUpdate(
      {
        _id: id,
        isBasic:false
      },
      body,
      { new: true }
    )
      .lean()
      .exec();

    if (!ModuleDocument) {
      return {
        err: { message: "Module not found." },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: ModuleDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
