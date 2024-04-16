const MonitoringType = require("../../models/MonitoringType");


module.exports = async (id) => {
    try {
      if (!id) return { err: { message: "missing ID" }, status: "error" };
      const docdel = await MonitoringType.findOneAndRemove(
        {
          _id: id
        }
        
      )
     /*  .lean()
      .exec() */
      
      if (!docdel) {
        return { err: { message: "Monitoring Type not found" }, status: "error" };
      }
  
      return { data: docdel, status: "success" };
    } catch (err) {
      return { err, status: "error" };
    }
  };
  