const Shift = require("../../models/Shift");


module.exports = async (id) => {
    try {
      const doc = await Shift.findOne({ _id: id }).lean().exec();
      if (!doc) {
        return {
          err: { message: "Shift not found" },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  