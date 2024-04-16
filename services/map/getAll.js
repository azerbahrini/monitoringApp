const MAP = require("../../models/MonitoringActivityPlannification");
const minsToString = require("../../utils/minutesToString");

module.exports = async (page, size) => {
  try {

    options = {
      offset: page * size,
      limit: size,
      populate: [
        { path: "monitoringAct", select: ["_id", "activity", "description"] },
      ],
    };
    // const docs = await MAP.find({}).lean().exec();
    let gatheredData = await MAP.paginate({}, options);
    let docs = gatheredData.docs;
    docs = docs.map((doc) => {
      let newDoc = doc._doc;
      newDoc = {
        ...newDoc,
        periodicity: minsToString(doc.periodicity),
        startTime: minsToString((doc.startTime), true),
        estimation: minsToString(doc.estimation),
      };
      return newDoc;
    });
    gatheredData = {...gatheredData,docs:docs}
    return { data: gatheredData, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
