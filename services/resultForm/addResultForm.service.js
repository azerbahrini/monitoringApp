const ResultForm = require('./../../models/ResultForm');
module.exports = async (doc) => {
  try {
    const ResultFormData = await ResultForm.create({ ...doc });

    return { data: ResultFormData, status: "success"};
  } catch (err) {
      console.error(err);
    return { err, status: "error" };
  }
};
