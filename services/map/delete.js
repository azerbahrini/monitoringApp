//Model Object
const MAP = require("../../models/MonitoringActivityPlannification");

module.exports = async (id) => {
  try {
    if (!id)
      return {
        err: { message: "missing ID" },
        statusCode: 400,
        status: "error",
      };
    const docdel = await MAP.findOneAndUpdate(
      { _id: id },
      {
        active: false,
      },
      { new: true }
    );
    if (!docdel) {
      return {
        err: { message: "Map not found." },
        status: "error",
        statusCode: 404,
      };
    }

    return { data: docdel, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
