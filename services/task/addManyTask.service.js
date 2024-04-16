//Model Object
const Task = require("../../models/Task");

module.exports = async (doc) => {
  try {
    const document = await Task.insertMany([...doc]);
    return { data: document, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
