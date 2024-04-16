//Model Object
const SysClass = require("../../models/SysClass");

module.exports = async (page, size,active , searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    findFilter = {
      ...active,
      libelle: { $regex: searchValue ? searchValue : ".", $options: "i" },
    };

    // const docs = await SysClass.find({}).lean().exec();
    const docs = await SysClass.paginate(findFilter, options)
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
