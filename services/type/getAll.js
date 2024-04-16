const Type = require("../../models/Type");
module.exports = async (page, size , activeFilter , searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }

    const findFilter = {
      ...activeFilter,
      type: { $regex: searchValue ? searchValue : ".", $options: "i" },
    };

    // const documents = await Type.find({}).lean().exec();
    const docs = await Type.paginate(findFilter, options)
    return { data: docs, status: "success" };
  } catch (err) {
    console.error(err);
    return {
      err,
      status: "error",
    };
  }
};
