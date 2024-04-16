const Shift = require("../../models/Shift");

module.exports = async (userId, date , type) => {
  try {
    const Role = await Shift.find(
      {
        user: userId,
        type: type,
        $and: [{ startDate: { $lte: date }, endDate: { $gte: date } }],
      },
      { role: 1, _id: 0 , user :1 /*, startDate : 1, endDate : 1 , type:1 */ }
    )
      .populate({ path: "role", select: { label: 1 } })
      .distinct("role")
      .lean()
      .exec();
      const objRole = Role.map(role => {
return{role:role}

      })
      const rolePopulated = await Shift.populate(objRole , { path: "role",model : "role" , select : ["label","_id"]})
    return { data: rolePopulated, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
