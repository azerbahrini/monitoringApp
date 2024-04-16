const shiftSyncLog= require('../../models/shiftSyncLog');


//Add Sla Type
exports.addLog = async function (obj) {

if(!obj.errorDescription){
    try {
        let syncedShifts=0
        let unsyncedShifts=0
        obj.shiftLog.forEach(shift => {
            if(shift){
                syncedShifts++
            }else{
                unsyncedShifts++
            }  
        });


        const log = await shiftSyncLog.create({syncedShifts:syncedShifts,unSyncedShifts:unsyncedShifts,shiftsSyncDate:new Date(),user:obj.user,syncedUsers:obj.syncedUsers})
        return(log)

    } catch (e) {
      console.error(e)
      return(e)
    }
   
}else{

    try {
     
        const log = await shiftSyncLog.create({errorDescription:obj.errorDescription})
        return(log)

    } catch (e) {
      console.error(e)
      return(e)
    }



}
  }
  


exports.getTheLastSyncLog = async function (req, res) {
    try {
      const logs = await shiftSyncLog
        .find({}).populate("user")
        .lean()
        .exec()

   d=0
   lastlog={}
      logs.forEach(log=> {
          if(log.shiftsSyncDate){
            if(log.shiftsSyncDate.getTime()>d){d=log.shiftsSyncDate.getTime();lastlog=log} }
       });
  
      res.status(200).json(lastlog)
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }