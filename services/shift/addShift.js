const Shift = require("../../models/Shift");


module.exports = async (doc) => {
    try {
      const document = await Shift.create(doc);
      return { data: document, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  