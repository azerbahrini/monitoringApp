const System = require("../../models/System");
const SysClass = require('../../models/SysClass')

module.exports = async (id) => {
  try {
    const doc = await System.findOne({ _id: id, isActive: true }).populate([
      {
        path: 'class',
        model: SysClass,
        select: 'libelle '
      },
      {
        path: 'type',
        select: 'type'
      },
      {
        path: 'category',
        select: 'category'
      }
    ]).lean().exec();
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
