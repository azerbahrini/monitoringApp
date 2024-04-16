const Module = require("../../models/Module");
module.exports = async (page, size, isBasic , searchValue) => {
  try {
    options = {
      offset: page * size,
      limit: size
    }
    if(isBasic){
    const docs = await Module.paginate({isBasic: true}, options);
    return { data: docs, status: "success" };
    }else{
      const docs = await Module.paginate({title: { $regex: searchValue ? searchValue : ".", $options: "i" }}, options);
      return { data: docs, status: "success" };
    }
  } catch (err) {
    return { err, status: "error" };
  }
};
