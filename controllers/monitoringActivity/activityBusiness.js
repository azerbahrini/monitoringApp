const MonitoringAct = require('../../models/MonitoringActivity')
const MAP = require("../../models/MonitoringActivityPlannification");


 



//GET_ALL_NOTASSIGNED_ACTIVITY
    exports.getNotAssignedA= async function (req, res) {
        try {
        let NotAssignedA=[]
        
         const docs = await MAP.find({active:true, system:req.params.id}).populate("monitoringAct").lean().exec();
         const d = await MonitoringAct.find({}).lean().exec();
         
         d.forEach(e => {
            let ok=true
            
            docs.forEach(e2 => {
                
                if(e2.monitoringAct._id.toString() === e._id.toString()){ok=false}
                
            });
            
            if (ok){NotAssignedA.push(e)} 
         });
        
         res.status(200).json(NotAssignedA);
          
        } catch (e) {
          console.error(e);
          res.status(400).end();
        }
      };
      
      