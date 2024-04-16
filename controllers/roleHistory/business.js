const Role = require('../../models/Role')
const Shift = require('../../models/Shift');
const RoleHistory = require('../../models/RoleHistory');
const User = require('../../models/User');

const { forEach, each } = require('async');
const { date } = require('joi');
const { NativeDate } = require('mongoose');


//===========================CURRENTDATE===================================
const currentdate=(d)=>{
let date
if (!d){date= new Date()}else{date= new Date(d)}            //return current date or the date in parameter to this format yyyy-mm-dd

  let m=''
  if ((date.getMonth()+1) <10)  {
       m= '0'+(date.getMonth()+1).toString()
   
  }else{ m= (date.getMonth()+1).toString()}
  let day=''
  if (date.getDate() <10)  {
       day= '0'+(date.getDate()).toString()
   
  }else{ day= (date.getDate()).toString()}
 
  return (date.getFullYear().toString()+'-'+m+'-'+day)
}



 //=============================DATETIME=========================
const Datetime= (date,deff)=>{
  let d
  if (date){d=date}else{d=new Date()}
let current = d.getTime() + (deff * -60000)                           // return the date and time of current utc and user time zone based 
let  utc    =  current + (deff  * 60000)                              // on time zone difference and the day if you pass a specific day                            
  return { current:new Date(current),utc:new Date(utc)}
}





//===============================SHIFTSTARTEND===============================
const shiftStartEnd=  async function(d,deff){

  let datetime
  if(d){datetime= Datetime(d,deff)}else{datetime= Datetime('',deff)}                     // it takes the time zone deff on param and return the start & end of shifts of the current 
  let day= datetime.utc                                                                  // date after finding out the min start shift and the max end shift and doing the comparison                                      // or for a  specific day if you pass a specific day on param                                           
  let start=''
  let end=''
  
 const shifts = await Shift
   .find( { "Sharedshift.startDateTime":{"$gte": new Date(currentdate(day)+"T00:00:00Z").toISOString(),"$lt" :  new Date(currentdate(day)+"T23:00:00Z").toISOString() } })
   .populate({path:"user",populate:{path:"RoleHistory",} }).lean().exec()


 let filterdShifts=[]
 shifts.forEach(s => {
   if(s.Sharedshift.endDateTime.getTime()-s.Sharedshift.startDateTime.getTime()<86400000){filterdShifts.push(s)}  
 });

  let max=new Date(currentdate(day)+"T00:00:00Z").getTime()
  let min=new Date(currentdate(day)+"T23:00:00Z").getTime()

  filterdShifts.forEach(s=> {
 if(s.Sharedshift.endDateTime.getTime()>max){max=s.Sharedshift.endDateTime.getTime()}
if(s.Sharedshift.startDateTime.getTime()<min){min=s.Sharedshift.startDateTime.getTime()}

});

let ms = max - min

 if(day.getTime()>(min-86400000)+ms){

  start=new Date(min)
  end=new Date(start.getTime()+ms)
  
 }
 if(day.getTime() <(min-86400000)+ms){

 start=new Date(min-86400000)
 end=new Date(start.getTime()+ms)
 
}

return {start:start,end:end ,max:new Date(max),min:new Date(min)}

 }
 


 exports.shiftSD = shiftStartEnd;



 // =====================get current TL by shift=====================================
 exports.getCurrentTLByShift = async function (req, res) {

  const startend= await shiftStartEnd('',req.body.timezone)
  tlrole = await Role.findOne({libelle:"Team Leader"}).exec(); //needed information {start & end of  all shift for the current day |  id of tole team leader | role }



  try {


    const shifts = await Shift
    .find( { "Sharedshift.startDateTime":{"$gte": startend.start.toISOString() }, "Sharedshift.endDateTime":{"$lte":startend.end.toISOString()} })  //  get shifts between start & end
    .populate({path:"user",populate:{path:"RoleHistory",} }).lean().exec()



  if (!shifts) {return res.status(200).json([]).end() }

let tls=[] // table of tls found


shifts.forEach(s => {     // forEach on  the shifts found  , inserting the tl found in table of tls after converting  the start & end of his shift to timezone of user
  let uh=''
  s.user.RoleHistory.forEach(e=> {
    if(e.startDate && e.endDate){
    if(e.startDate.getTime() <= s.Sharedshift.startDateTime.getTime() && e.endDate.getTime() >= s.Sharedshift.endDateTime.getTime() && e.Role.toString() === tlrole._id.toString() ){
    uh=e}
    }
  });
  
  let from =new Date(s.Sharedshift.startDateTime.getTime() + (req.body.timezone * -60000))
  let to   =new Date(s.Sharedshift.endDateTime.getTime() + (req.body.timezone * -60000))
   
  if(uh){tls.push(
    

    {_id:s.user._id,firstName:s.user.firstName,lastName:s.user.lastName,shift:s.Sharedshift.displayName  ,from:from,to:to}

  )}
   
 }); 




    res.status(200).json(tls);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }


}

 



// ==========================get  TL  History
exports.getTLHistory= async function (req, res) {           //return all the history of team leaders

try{
  const startend= await shiftStartEnd('',req.body.timezone)


   const  tlrole = await Role.findOne({libelle:"Team Leader"}).lean().exec();
   const rolesh = await RoleHistory.find({Role:tlrole._id}).lean().exec()            

  const shifts = await Shift
  .find( {  "Sharedshift.endDateTime":{"$lt":startend.start.toISOString()} })         //get all shifts that have end time smaller than the current day
  .populate({path:"user",populate:{path:"RoleHistory",} }).lean().exec()


  if (!shifts) {return res.status(200).json([]).end() }



let tls=[]

shifts.forEach(s => {        // for each shift we check if the user has a team leader role history at the time of the shift if yes we add the user with shift after changing the timezone
  let uh=''
  rolesh.forEach(e=> {
  if(e.endDate && e.startDate){

    if(e.startDate.getTime() <= s.Sharedshift.startDateTime.getTime() && e.endDate.getTime() >= s.Sharedshift.endDateTime.getTime() && e.user.toString() === s.user._id.toString()){uh=e}
  }
  });

 
  let from =new Date(s.Sharedshift.startDateTime.getTime() + (req.body.timezone * -60000))
  let to   =new Date(s.Sharedshift.endDateTime.getTime() + (req.body.timezone * -60000))
  if(uh){
    

    tls.push(

    {_id:s.user._id,firstName:s.user.firstName,lastName:s.user.lastName,shift:s.Sharedshift.displayName  ,from:from ,to:to})}
   
 }); 

 
  res.status(200).json(tls);
} catch (e) {
  console.error(e);
  res.status(400).end();
}


}



//=================== planned  TL
exports.getPlannedTL= async function (req, res) {          //return all the history of team leaders     
try{
  const startend= await shiftStartEnd('',req.body.timezone)

 const tlrole = await Role.findOne({libelle:"Team Leader"}).exec();


  const shifts = await Shift.find({ "Sharedshift.startDateTime":{"$gt" : startend.end.toISOString() } }) //get all shifts that have end time greater than the current day
  .populate({path:"user",populate:{path:"RoleHistory",}}).lean().exec()
  

if (!shifts) {return res.status(200).json([]).end() }



let tls=[]

shifts.forEach(s => {// for each shift we check if the user has a team leader role history at the time of the shift if yes we add the user with shift after changing the timezone
  let uh=[]
  s.user.RoleHistory.forEach(e=> {
    if(e.startDate && e.endDate){
    if(e.startDate.getTime() <= s.Sharedshift.startDateTime.getTime() && e.endDate.getTime() >= s.Sharedshift.endDateTime.getTime() && e.Role.toString() === tlrole._id.toString() ){
      uh.push(e)}
    }
  });

  let startd =new Date(s.Sharedshift.startDateTime.getTime() + (req.body.timezone * -60000))
 
   
  if(uh[0]){
    

    

    o={user_id:s.user._id,firstName:s.user.firstName,lastName:s.user.lastName,shift:s.Sharedshift.displayName  ,dates:[startd]}

    let t= addDate(tls,s.user._id,startd)
    if(!t){tls.push(o)}else{tls=t}
  }
   
 }); 

   


  res.status(200).json(tls);
} catch (e) {
  console.error(e);
  res.status(400).end();
}


}



const addDate=(o,id,d)=>{
ok=false
  o.forEach(s => {
  
   if(id.toString() === s.user_id.toString()){s.dates.push(d) ;ok=true}


  })
if(ok){return o}else{return ok}
}

// ====================================================available members
exports.availability= async function (req, res) {
    try{
 
      const start= await shiftStartEnd(new Date(req.body.startdate),req.body.timezone)
      const end= await shiftStartEnd(new Date(req.body.enddate),req.body.timezone)


  
  
      tlrole = await Role.findOne({libelle:"Team Leader"}).exec();
      gsrole = await Role.findOne({libelle:"Global Support"}).exec();

       allroleh = await RoleHistory.find().populate("Role").exec();
      
      const  shifts = await Shift.find(  {"Sharedshift.startDateTime":{"$gte": start.min.toISOString() }, "Sharedshift.endDateTime":{"$lte":end.max.toISOString()},"Sharedshift.displayName":req.body.shift})
      .populate({path:"user",populate:{path:"RoleHistory",}}).lean().exec()//return members available and members assigned between 2 dates in a specific shift
      
      if (!shifts) {return res.status(200).json([]).end() }

  
    let availableMembers=[]
    let assignedTL=[]
    shifts.forEach(s => { //for each shift we check if the user is team lead at that shift and  it count the  number of assignment of team lead 
        let r={TL:false,GS:false,other:false}
        let uh=[]
        let tlan=0
         
        allroleh.forEach(e => {//count number of assignment
         if(e.user.toString() === s.user._id.toString() && e.Role.libelle === "Team Leader"){tlan++}

        })


        s.user.RoleHistory.forEach(e=> { //return the roles the user have in the start and  end  time of shift 
          if(e.startDate && e.endDate){
          if(e.startDate.getTime() <= s.Sharedshift.startDateTime.getTime() && e.endDate.getTime() >= s.Sharedshift.endDateTime.getTime()  ){           

          uh.push(e)}
          }
        });
       
          if (uh[0]){
          uh.forEach(ro=> { //check  the roles  of user in that shif  to know if he's assigned or available
            
          if(ro.Role.toString() === tlrole._id.toString()){r.TL=true}
          else if(ro.Role.toString() === gsrole._id.toString()){r.GS=true}
          else{r.other=true}
          }); 
           
            
          }

          let st =new Date(s.Sharedshift.startDateTime.getTime() + (req.body.timezone * -60000)) //adapt  shift dates with enduser  timezone
          

    sh={shift_id:s._id,user_id:s.user._id,firstName:s.user.firstName,lastName:s.user.lastName,shift:s.Sharedshift.displayName, dates:[st],assignN:tlan}  

    
        if(r.TL ){
          let t= addDate(assignedTL,s.user._id,st)
          if(!t){assignedTL.push(sh)}else{assignedTL=t}

        } 

        if(r.GS && !r.TL){
         let  t= addDate(availableMembers,s.user._id,st)
          if(!t){availableMembers.push(sh)}else{availableMembers=t}

        } 

        
       }); 
      
     o={availableMembers:availableMembers,assignedTL:assignedTL}
       
 
    
  
      res.status(200).json(o);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  
  
  }




  const linkRoleHistoryToUser=async function(o,timezone){//create many rolehistory and link the id of each role history with it user
  let day= Datetime('',timezone)
 
  const d= await RoleHistory.insertMany([...o ])

  let rht= []
   d.forEach(e=> {
     rht.push(e._id)
   });
   
  const u= await User.findById({_id: d[0].user}).populate("RoleHistory") .lean().exec();

  u.RoleHistory.forEach(e=> {
    if(e.startDate && e.endDate){
    if(e.Role.toString() !== d[0].Role.toString()  ){rht.push(e._id)}
    else if(e.endDate.getTime() > day.utc.getTime() ){rht.push(e._id)}
    }
  });
  const updatedUser = await User.findOneAndUpdate({_id:u._id},{...u,RoleHistory:rht},{ new: true }).lean().exec()
  
   return updatedUser 
  }



  // add role historys
exports.addRoleHistorys= async function (req, res) { //prepare the data needed for assigning many role histories given and adding it using the previous method

  let role = await Role.findOne({libelle:"Team Leader"}).exec();

  
  try{
    

  const promises= req.body.map(async sh => {
    
    const startend= await shiftStartEnd(new Date(sh.day.year,sh.day.month,sh.day.date),sh.timezone)
    ob={user:sh.user,Role:role._id,startDate:startend.min,endDate:startend.max}
    return ob

    })
  const r= await Promise.all(promises)

   linkRoleHistoryToUser(r,req.body[0].timezone)

   res.status(200).json(r);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }


}



 // revoke Tl
 exports.revokeTL= async function (req, res) {//revoke all team lead assigned between 2 dates given
  try{
    const start= await shiftStartEnd(new Date(req.body.startdate),req.body.timezone)
    const end= await shiftStartEnd(new Date(req.body.enddate),req.body.timezone)




    tlrole = await Role.findOne({libelle:"Team Leader"}).exec();

    deleted= await RoleHistory.deleteMany({ "startDate": { "$gte" :start.min.toISOString() },"endDate":{"$lte" :end.max.toISOString()},
    "Role":tlrole._id,"user":req.body.user})

    if(deleted){//after deleting them from collection role history we check all users and remove the deleted role historys ids from the user
    const allroleh = await RoleHistory.find({user:req.body.user}).exec();
    const u= await User.findById({_id:req.body.user}).lean().exec();
    let newRoleh=[]
    u.RoleHistory.forEach(e=> {allroleh.forEach(e2=> {if(e.toString() === e2._id.toString()){newRoleh.push(e)} })})
    const updatedUser = await User.findOneAndUpdate({_id:req.body.user},{...u,RoleHistory:newRoleh},{ new: true }).lean().exec()}


    res.status(200).json("revoked");
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
  
  
  }



  exports.getTeamByshift= async function (req, res) {//return current teams by shift and the role of everyone and if he's active or not
    let day= Datetime('',req.body.timezone)
   const startend= await shiftStartEnd('',req.body.timezone)

console.log(startend)

  const tlrole = await Role.findOne({libelle:"Team Leader"}).exec();
  const  gsrole = await Role.findOne({libelle:"Global Support"}).exec();

  try {

    const shifts = await Shift
    .find( { "Sharedshift.startDateTime":{"$gte": startend.start.toISOString() }, "Sharedshift.endDateTime":{"$lte":startend.end.toISOString()} })
    .populate({path:"user",populate:{path:"RoleHistory",} }).lean().exec()

  if (!shifts) {return res.status(200).json([]).end() }

let team=[]


shifts.forEach(s => {
  let r={TL:false,GS:false,other:false}
  let uh=[]
  let active=false 

        s.user.RoleHistory.forEach(e=> {
          if(e.startDate && e.endDate){
          if(e.startDate.getTime() <= s.Sharedshift.startDateTime.getTime() && e.endDate.getTime() >= s.Sharedshift.endDateTime.getTime()  ){           

          uh.push(e)}
        }
        });
       
          if (uh[0]){
          uh.forEach(ro=> {
            
          if(ro.Role.toString() === tlrole._id.toString()){r.TL=true}
          else if(ro.Role.toString() === gsrole._id.toString()){r.GS=true}
          else{r.other=true}
          }); 
           
            
          }
          let role=''
           if(r.TL && ! r.other){role='TL'}
           if(r.GS && !r.TL  &&!r.other){role='GS'} 
           if(r.other || !uh[0]){role='other'} 
            
      let from =new Date(s.Sharedshift.startDateTime.getTime() + (req.body.timezone * -60000))
       let to  =new Date(s.Sharedshift.endDateTime.getTime() + (req.body.timezone * -60000))
       
       if(day.current.getTime()>=from.getTime() &&day.current.getTime() <= to.getTime()){active=true}

    mem={shift_id:s._id,user_id:s.user._id,firstName:s.user.firstName,lastName:s.user.lastName,shift:s.Sharedshift.displayName,
    from:from,to:to,role:role, active:active}  

    
       team.push(mem)
        
       }); 

       
 


    res.status(200).json(team);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
    
    
    }




 exports.syncGS= async function () {//add global support role for all users
  try{
    const  gsrole = await Role.findOne({libelle:"Global Support"}).exec();

    const shifts = await Shift.find( ).populate('user').lean().exec()
      users = await User.find().populate("RoleHistory") .lean().exec();

    deleted= await RoleHistory.deleteMany({ "Role":gsrole._id})

  if (!shifts) {return res.status(200).json([]).end() }
  let max  =new Date(currentdate(new Date())+'T00:00:00Z' ) 
  let min  =new Date(currentdate(new Date())+'T00:00:00Z' )
  
shifts.forEach(s => {
  
  if(max < s.Sharedshift.endDateTime.getTime()){max=s.Sharedshift.endDateTime.getTime()}
  if(min > s.Sharedshift.startDateTime.getTime()){min=s.Sharedshift.endDateTime.getTime()}
});

const promises= users.map(async user => {
  const UserShift= await Shift.findOne({user:user._id}).lean().exec()
if(UserShift){
  const role= await RoleHistory.create({user:user._id,Role:gsrole._id,startDate:new Date(min),endDate:new Date(max)})
  roles=[]
  user.RoleHistory.forEach(e=> {
    if(e.Role.toString() !== gsrole._id.toString()){roles.push(e._id)}
  });
  roles.push(role._id)

  const updatedUser = await User.findOneAndUpdate({_id:user._id},{...user,RoleHistory:roles},{ new: true }).lean().exec()

   return updatedUser
  }
})
const r= await Promise.all(promises)



   return('done');
  } catch (e) {
    console.error(e);
    return('fail');
  }
  
  
  }



 exports.cleanCurrentRoleH= async function (req, res) {//check for each user if there is old role histories in the user collection and remove it
  try{
    const tlrole = await Role.findOne({libelle:"Team Leader"}).exec();

      users = await User.find().populate("RoleHistory") .lean().exec();

const promises= users.map(async user => {
  let rht=[]
  user.RoleHistory.forEach(e=> {
    if(e.endDate){
    if(e.Role.toString() !== tlrole._id.toString()  ){rht.push(e._id)}
    else if(e.endDate.getTime() > new Date().getTime()  ){rht.push(e._id)}
     }
  });

  const updatedUser = await User.findOneAndUpdate({_id:user._id},{...user,RoleHistory:rht},{ new: true }).lean().exec()



   return updatedUser
})
const r= await Promise.all(promises)



   return('done')

  } catch (e) {
    console.error(e);
    return('fail')
  }
  
  
  }
