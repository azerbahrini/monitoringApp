const Shift = require("../../models/Shift");

module.exports = async (conditions) => {
    try {
      const document = await Shift.deleteMany(conditions);
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  