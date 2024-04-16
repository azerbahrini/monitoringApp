const Customer = require("../../models/Customer");
const System = require('../../models/System')
const Type = require("../../models/Type");
const Category = require("../../models/Category");
const { forEach } = require("async");






//Get All active Customers
exports.getSystemStatusByCustomer = async function (req, res) {
  try {
    const docs = await Customer.find({ active: true }).populate({path:"listSystem",populate:{path:"listMap",populate:{path:"task",
    populate:{path:"resultat"}}}}).populate({path:"listSystem",populate:{path:"listMap",populate:{path:"monitoringAct"}}})
    .populate({path:"listSystem",populate:{path:"type"}}).lean().exec();

    if (!docs) {
      return res.status(401).json({ message: "Customer not found " }).end()
    }
      let r=[]
             docs.forEach(e => { 
           
              let    sys=[]
            e.listSystem.forEach(s=>{
                let o={system_id:s._id,system:s.system,type:s.type}
                let ts=[]
                let i=-1
                s.listMap.forEach(m=>{
                    
                    
                        if(m.active){
                            i++
                            ts[i]={activity_id:m.monitoringAct._id,activity:m.monitoringAct.activity 
                            ,type:m.monitoringAct.type,description:m.monitoringAct.description,taskresult:m.task}
                           

                    
                }
                
                })
                sys.push({...o,Activities:ts})
            })




             r.push({cust_id:e._id,custLogo:e.logo,custlibelle:e.libelle,SystemStatus:sys})
              })


    res.status(200).json(r);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

