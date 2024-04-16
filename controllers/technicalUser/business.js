const Customer = require('../../models/Customer')
const TechnicalUser = require('../../models/Category')
const System = require('../../models/System')
const Level = require('../../models/Level');

//Get All active Customers
exports.getAllTechnicalUserCS = async function (req, res) {
  try {
    const level= await Level.find({}).lean().exec();
    const sys = await System.find({})
    .populate("customer","libelle")
    .populate("ListTechnicalUser").lean().exec();
 let techUsers=[]
    sys.forEach(e => {
      e.ListTechnicalUser.forEach(e2 => {
        techUsers.push({...e2,sysid:e._id,system:e.system,customer:e.customer.libelle})
   });
 });
       let i=0;
       techUsers.forEach(e => {
    level.forEach(e2 => {
        if(e.level.toString() ===e2._id.toString()) {
         user[i]={...e,levelN:e2.label}
        }
         
      });
      i++
   });

    res.status(200).json(techUsers);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};



exports.getTechnicalUsersByLevel = async function (req,res) {
  console.log(req.body.label) 
  try {
    const level= await Level.find({}).lean().exec();
    const sys = await System.find({})
    .populate("customer","libelle")
    .populate({path:"ListTechnicalUser",populate:{path:"techType",} })
    .populate({path:"ListTechnicalUser",populate:{path:"host",} })
    .populate({path:"ListTechnicalUser",populate:{path:"level",} }).lean().exec();
       let techUsers=[]
    sys.forEach(e => {
   e.ListTechnicalUser.forEach(e2 => {  
     console.log(e2.level.label)
        if(req.body.label >= e2.level.label){ techUsers.push({...e2,sysid:e._id,system:e.system,customer:e.customer.libelle})}
    });
 });


       let i=0;
       techUsers.forEach(e => {
    level.forEach(e2 => {
        if(e.level.toString() === e2._id.toString()) {
          techUsers[i]={...e,levelN:e2.label}
        }
         
      });
      i++
   });
 

   res.status(200).json(techUsers);
    
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
