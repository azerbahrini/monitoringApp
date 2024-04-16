const Shift = require("../../models/Shift");
const moment = require('moment');
const TlHistory = require("../../models/TeamLeadHistory");

module.exports = async (teamLeaderId,shift,startDate,endDate) => {
  try {
    const TlHistories = await TlHistory.find({}).lean().exec();
    const start = new Date(moment(startDate + "T00:00:00.000Z"));
    const end = new Date(moment(endDate + "T23:59:59.000Z"));
    let members=[];

    const userAvailable = (await Shift.find({startDate: {$gte:start,$lte:end},name:shift},{user:1})
    .populate({ path: "user", model: "user", select: ["firstName", "lastName","email"], match: { status: true }  })
    .lean().exec())
    .map(item=>{return { user: item.user, total:0 }});

    const shiftHistory = (await Shift.find({},{_id:1}).lean().exec()).map(item=>{return (item._id)});

    const tlDocs = await Shift.aggregate([
      {
        $match: {
           _id: {$in: shiftHistory},
           role: teamLeaderId
           }
      },
      { $group: { _id: { user: "$user"}, total: { $sum: 1 } } },
      {$project : {user : '$_id.user', total : '$total', _id : 0}}
    ]);

    const tlDocsPopulated = await Shift.populate(tlDocs, { path: "user", model: "user", select: ["firstName", "lastName","email"], match: { status: true } });
 
let usersIds=[];
    userAvailable.forEach(userObject=>{
      if(userObject.user && !usersIds.includes(userObject.user._id)){
        usersIds.push(userObject.user._id);
        let exist=false;
        tlDocsPopulated.forEach(tlObject=>{
          if(tlObject.user && userObject.user._id.toString()===tlObject.user._id.toString()){
            exist=true;
            let history = TlHistories.find((item) => item.email === tlObject.user.email);
            if(history){
              tlObject.total=tlObject.total+history.count
            }
            members.push(tlObject);
          }
        })
        if(!exist){
          let history = TlHistories.find((item) => item.email === userObject.user.email);
            if(history){
              userObject.total=userObject.total+history.count
            }
          members.push(userObject);
        }
      }
    })    
    return { data: members, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
