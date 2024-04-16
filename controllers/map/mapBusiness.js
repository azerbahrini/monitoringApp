const MAP = require("../../models/MonitoringActivityPlannification");
const System = require('../../models/System');
const Task = require('../../models/Task');

var moment = require('moment');

// add map to system
exports.addMAPtoSys = async function (mapid, sysid) {
  try {
    const doc = await System
      .findOne({ _id: sysid })
      .lean()
      .exec()

      if (!doc) {
        return res.status(401).json({ message: "System not found " }).end()
      }
    doc.listMap.push(mapid)

    const updatedDoc = await System
      .findOneAndUpdate(
        {
          _id: sysid
        },
        doc,
        { new: true }
      )
      .lean()
      .exec()

  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//get unassigned tasks

exports.getUnassignedTasks = async function (req, res) {
  try {

    var start = new Date(req.body.startshift);

    var end = new Date(req.body.endshift);

    var shiftDuration = end - start;
    var diffMins = Math.round(((shiftDuration % 86400000) % 3600000) / 60000);
    //console.log(diffMins)
    const doc2 = await Task.find({
      "system": req.body.system,
      "map._id": req.body.map,
      /* "map.periodicity":{$gt:diffMins},
      $or:[{"map.startTime":{"$gte":start,"$lt":end}},
      {"map.startTime+map.periodicity":{"$gte":start,"$lt":end}},
      {"map.startTime+map.periodicity*2":{"$gte":start,"$lt":end}}], */
      //"map.active":true, 
      "createdAt": {
        "$gte": new Date(req.body.date),
        "$lt": new Date(req.body.enddate)
      }
    }).select("-Resultat").populate("map").lean().exec()

    const doc1 = await System.find({ listMap: { $gt: [] } }).lean().select('listMap').select('_id').populate('listMap').exec()
    if (!doc2) {
      return res.status(401).json({ message: "Task not found " }).end()
    }

    array2 = doc2.map(e => {
      return (e.map._id + " " + e.system);
    })
    //console.log(array2)

    arr1 = doc1.map(item => {
      return item.listMap.map(el => {
        return (el._id + " " + item._id)
      })

    })
    arr1 = arr1.flat()
    //console.log(arr1); 
    array1 = arr1.filter(e => !array2.includes(e))
    //console.log(array1)
    a1Map = array1.map(e => { return e.split(" ")[0] })
    //console.log(a1Map)
    a1sys = array1.map(e => { return e.split(" ").pop() })
    //console.log(a1sys)

    var timearray = []

    doc2.map(e => {

      if (e && e.map && e.map.startTime) {

        var obj = {}
        obj.id = e.map._id
        obj.mapStartTime = e.map.startTime
        //console.log("1"+obj.mapStartTime)
        var p1 = e.map.periodicity * 60000
        //console.log(p1);
        obj.mapStartTime1 = new Date(e.map.startTime.getTime() + p1)
        //console.log("2"+obj.mapStartTime1)
        obj.mapStartTime2 = new Date(e.map.startTime.getTime() + (p1 * 2))
        //console.log("3"+obj.mapStartTime2)


        if (e.map.periodicity > (req.body.endshift - req.body.startshift)) {
          if (((obj.mapStartTime < req.body.endshift) && (obj.mapStartTime >= req.body.startshift)) || (
            (obj.mapStartTime1 < req.body.endshift) && (obj.mapStartTime1 >= req.body.startshift)) || (
              (obj.mapStartTime2 < req.body.endshift) && (obj.mapStartTime2 >= req.body.startshift))) {
            timearray.push(obj)
            a1Map.push(obj.id)
            console.log(e.map)
          }
        }
      }



    })
    console.log(a1Map)
    const doc3 = await System.find({ "listMap": { $in: a1Map } }).lean().select('listMap').select('_id').populate('listMap').exec()

    const doc4 = await Task.find({ "map": { $in: a1Map } }).select("-Resultat").populate("map").lean().exec()

    return res.status(200).json({ array1: doc3, array2: doc4 })

  } catch (e) {

    console.error(e)
    res.status(400).end()
  }
}

//assign a map to a system

/* exports.setMapToSystem = async function (req,res){
  try {
    const doc1 = await Map.find({"system":null})}
    catch(e){
      console.error(e)
    res.status(400).end()
    }
} */

    //add tasks to map task list


/* exports.addTasksToMaps = async function(req,res){
  try{
//    const taskDoc = await Task.find({_id : {$in: req.body.mapid}}).lean().exec();
    console.log (taskDoc);


     if(taskDoc){
    const mapDoc = await (await MAP.findOneAndUpdate({_id:req.body.map},{$push: {'listTask': req.body.listTask}},{new: true}));

    if (!mapDoc) {
      return res.status(401).json({ message: "MAP not found " }).end()
    }

    res.status(200).json({ data: mapDoc })}
    else{
      return res.status(402).json({ message: "tasks not found " }).end()}




  }catch(e){
    console.error(e)
    res.status(400).end()
  }
} */