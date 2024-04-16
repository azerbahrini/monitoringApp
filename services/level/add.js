const Level = require("../../models/Level");
module.exports = async (doc) => {
  try {
    const document = await Level.create(doc);

    return {
      data: document,
      status: "success",
    };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error",
    };
  }
};
