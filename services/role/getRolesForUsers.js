const Shift = require("../../models/Shift");
const moment = require("moment");

module.exports = async () => {
  try {
    let date = new Date(moment.now())
    const Role = await Shift.find(
      {
        type: "app",
        $and: [{ startDate: { $lte: date }, endDate: { $gte: date } }],
      },
      { role: 1, _id: 0 , user :1 }
    )
      .populate({ path: "role", select: { label: 1 } })      
      .lean()
      .exec();
    
    return { data: Role, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
