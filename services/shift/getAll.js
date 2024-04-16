const Shift = require("../../models/Shift");
const moment = require('moment');
const momentTz = require('moment-timezone');


module.exports = async (teamLeaderId, startDate, endDate, timeZone, shift, user) => {
  try {
    const start = new Date(moment(startDate + "T00:00:00.000Z"));
    const end = new Date(moment(endDate + "T23:59:59.000Z"));
    const match = shift && user ?
      {
        startDate: { $gte: start, $lt: end },
        type: "shift",
        name: shift
      } :
      {
        startDate: { $gte: start, $lt: end },
        type: "shift"
      };
    let allShifts = [];
    const shiftDocs = await Shift.aggregate([
      {
        $match: match
      },
      {
        $group: {
          _id: { name: "$name", startDate: "$startDate", endDate: "$endDate", role: "$role" }
          , records: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          shift: '$_id', members: '$records.user',
          color: '$records.color', theme: '$records.theme',
          typeId: '$records.typeId', _id: 0
        }
      }
    ]);

    const shiftDocsPopulated = await Shift.populate(shiftDocs, { path: "members", model: "user", select: ["firstName", "lastName"], match: { status: true } });
    let generatedId = 1;
    shiftDocsPopulated.forEach(element => {
      let teamLeader = null;
      if (element.shift.role.toString() === teamLeaderId.toString()) {
        teamLeader = element.members[0];
      }

      let newShift = {
        shift: {
          _id: "shift_00" + generatedId.toString(),
          name: element.shift.name,
          startDate: momentTz(element.shift.startDate).tz(timeZone).format(),
          endDate: momentTz(element.shift.endDate).tz(timeZone).format(),
          theme: element.theme[0],
          color: element.color[0],
          typeId: element.typeId[0]
        },
        members: element.members,
        teamLeader: teamLeader
      };

      let exist = false;
      allShifts.forEach(shift => {
        if (element.shift.name === shift.shift.name && moment(element.shift.startDate).utc().startOf('day').isSame(moment(shift.shift.startDate).utc().startOf('day'))) {
          exist = true;
          if (moment(element.shift.startDate).format("HH:mm") < moment(shift.shift.startDate).utc().format("HH:mm")) {
            shift.shift.startDate = momentTz(element.shift.startDate).tz(timeZone).format();
          }
          if (moment(element.shift.endDate).format("HH:mm") > moment(shift.shift.endDate).utc().format("HH:mm")) {
            shift.shift.endDate = momentTz(element.shift.endDate).tz(timeZone).format();
          }
          if (element.shift.role.toString() !== teamLeaderId.toString()) {
            let array = shift.members;
            array.push(...element.members);
            shift.members = array.map(item => item).filter((value, index, self) => self.indexOf(value) === index)
          } else {
            shift.teamLeader = teamLeader;
          }
        }
      })
      if (!exist) {
        allShifts.push(newShift);
      }
      generatedId++;
    })
    let allShiftsByUser=[];
    if(user && shift){
      allShifts.forEach(item=>{
        item.members.forEach(member=>{
          if(member._id.toString()===user.toString()){
            allShiftsByUser.push(item);
          }
        })
      })
      return { data: allShiftsByUser, status: "success" };
    }else{
      return { data: allShifts, status: "success" };
    }
  } catch (err) {
    return { err, status: "error" };
  }
};
