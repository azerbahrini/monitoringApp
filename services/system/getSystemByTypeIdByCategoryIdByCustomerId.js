const System = require("../../models/System");
const SysClass = require('../../models/SysClass')


module.exports = async (customer, type, category) => {
  try {
    const doc = await System.find({ customer: customer, type: type, category: category, isActive: true })
      .populate({
        path: 'class',
        model: SysClass,
        select: 'libelle '
      })
      .lean()
      .exec();
    if (!doc) {

      return {
        err: { message: "System not found" },
        status: "error",
        statusCode: 404,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
