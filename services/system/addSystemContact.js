const System = require("../../models/System");

module.exports = async (contact, id) => {
  try {
    const updatedDoc = await System.findOneAndUpdate({ _id: id }, {$push: {"listCustomerContact": contact}}, {
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
    return { err, status: "error" };
  }
};
