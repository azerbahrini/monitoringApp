const MAP = require("../../models/MonitoringActivityPlannification");

module.exports = async (filter, doc) => {
  try {
    if (!filter._id) {
      return {
        err: { message: "missing ID" },
        statusCode: 400,
        status: "error",
      };
    }
    const mapDoc = await MAP.findOneAndUpdate(filter, doc);
    if (!mapDoc) {
      return {
        status: "error",
        statusCode: 404,
        err: { message: "MAP not found" },
      };
    }
    const updatedMapDoc = await MAP.findOne(filter);
    return { data: updatedMapDoc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
