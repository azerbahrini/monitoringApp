const Nomenclature = require("../../models/Nomenclature");

module.exports = async (conditions) => {
  try {
    const docs = await Nomenclature.find(conditions,{name:1,theme:1,color:1})

    if(!docs){

      return {
        err: { message: "No Nomenclature found !" },
        status: "success",
        statusCode: 204,
      };
    }
    return { data: docs, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
