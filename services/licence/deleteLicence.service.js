const Licence = require("../../models/Licence");
module.exports = async (id) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const docdel = await Licence.findOneAndUpdate(
      {
        _id: id,
        isActive:true
      },
      {isActive:false},
      { new: true }
    )
    .lean()
    .exec()
    
    if (!docdel) {
      return {
        err: { message: "Licence not found." },
        status: "error",
        statusCode: 404,
      };
    }

    return { data: docdel, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
