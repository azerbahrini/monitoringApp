const Result = require("../../models/Result");
const Task = require("../../models/Task");
const MAP = require("../../models/MonitoringActivityPlannification");
const { taskNotif } = require("../../kafka/notificationServiceKafka");
const moment = require('moment');

//add result and update

exports.addRes = async function (req, res) {
 
  try {
    const doc = await Result.create({
      result: req.body.result,
      host: req.body.host,
      task: req.body.task,
      files: req.body.files
    });

    const taskName = doc.task;
    const resId = doc._id;
    const resDate = doc.createdAt.toISOString().split("T")[0];
    const gs = req.body.globalStatus.toString();
    const doc2 = await Task.find(
      { _id: req.body.taskId })
      .lean()
      .exec();

    const taskId = req.body.taskId;
    const mapId = doc2[0].map;
    const updateData = { "resultat": resId, "globalStatus": gs, "state": "Done" };
    const updateMap = { task: taskId };
    console.log(resId)
    console.log(gs)

    const updatedDoc = await Task.findOneAndUpdate(
      {
        _id: taskId,
      },
      updateData,
      {
        new: true,
        populate: [
          { path: "system",select:"system", populate:{path:"customer",select:"libelle"}},
          { path: "resultat", model: "result" },
        ],
      }
    )
      .lean()
      .exec();

      if (!updatedDoc) {
        return res.status(401).json({ message: "Task not found " }).end()
      }

    taskNotif({ key: "System", task: updatedDoc })

    const updatedDoc1 = await MAP.findOneAndUpdate(
      {
        _id: mapId,
      },
      updateMap,
      { new: true }
    )
      .lean()
      .exec();

if (!updatedDoc1) {
        return res.status(401).json({ message: "MAP not found " }).end()
      }

   return res.status(201).json({ data: doc });
    
  } catch (e) {
    console.error(e);
   return res.status(400).end();
  }

};

//Delete result
exports.deleteRes = async function (req, res) {
  const today = new Date();
  var date =
    ("0" + today.getFullYear()).slice(-4) +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2) +
    " " +
    ("0" + today.getHours()).slice(-2) +
    ":" +
    ("0" + today.getMinutes()).slice(-2) +
    ":" +
    ("0" + today.getSeconds()).slice(-2) +
    ":" +
    ("0" + today.getUTCMilliseconds()).slice(-2);

  try {
    Result.updateOne(
      { _id: req.params.id },
      {
        $set: { Deleted_at: date },
      }
    )
      .lean()
      .exec();
    return res.status(200).json({ message: "Result deleted" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Get All result
exports.getAllRes = async function (req, res) {
  try {
    const docs = await Result.find({ Deleted_at: null })

      .lean()
      .exec();
if (!docs) {
        return res.status(401).json({ message: "Result not found " }).end()
      }
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};




//Update result
exports.updateRes = async function (req, res) {
  try {
    const updatedDoc = await Result.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(401).json({ message: "Result not found " }).end();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};



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

//result history by date
exports.getResultHistory = async function (req, res) {
  try {
    console.log(req.body)

    const docs = await Task.find({ createdAt:{"$gte": new Date(currentdate(req.body.day)+"T00:00:00Z").toISOString(),
    "$lte" :  new Date(currentdate(req.body.day)+"T23:59:59Z").toISOString() } ,system:req.body.system,title:req.body.task}
    ).populate("resultat").lean().exec();

    console.log(docs)

    
    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
