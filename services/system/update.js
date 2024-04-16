const System = require("../../models/System");

module.exports = async (doc, id) => {
  try {
    const updatedDoc = await System.findOneAndUpdate({ _id: id }, doc, {
      new: true,
    })
      .lean()
      .exec();

    if (!updatedDoc) {
      return {
        err: { message: "System not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: updatedDoc, status: "success" };
  } catch (err) {
   // console.log(err);
    return { err, status: "error" };
  }
};
