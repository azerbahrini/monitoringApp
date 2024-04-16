const Level = require("../../models/Level");
module.exports = async (page, size) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    // const docs = await Level.find({}).lean().exec();
    const docs = await Level.paginate({}, options)
    return {
      data: docs,
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
