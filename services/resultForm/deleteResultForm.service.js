const ResultForm = require('./../../models/ResultForm');
module.exports = async (id) => {
  try {
    if (!id) return { err: { message: "missing ID" }, status: "error" };
    const ResultFormDataDelete = await ResultForm.findOneAndUpdate({ _id: id }, {
      isActive: false
    },
      { new: true });

    if (!ResultFormDataDelete) {
      return { err: { message: "form result not found" }, status: "error" };
    }

    return { data: ResultFormDataDelete, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};