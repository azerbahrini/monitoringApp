const Client = require("../../models/Client");

module.exports = async (page, size) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    // const docs = await Client.find({ isActive: true }).lean().exec();
    const docs = await Client.paginate({isActive: true}, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
