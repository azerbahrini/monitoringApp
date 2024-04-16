const Shift = require("../../models/Shift");
const { teamLeaderNotif } = require("../../kafka/notificationServiceKafka");


module.exports = async (docParam) => {
    try {
      const doc = await Shift.insertMany(
        docParam
      )
      if (!doc) {
        return {
          err: { message: "Cannot Assign A Team Leader " },
          status: "error",
          statusCode: 404
        };
      }
      const docs = doc.map(item => ({
        'user': item.user,
        'shift': item.name,
        'startDate': item.startDate,
        'endDate': item.endDate
       }));

       teamLeaderNotif({ key: 'TeamLeader', shift: docs });
      return { data: doc, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  