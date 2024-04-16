const MAP = require("../../models/MonitoringActivityPlannification");
const businessControllers = require('./mapBusiness');
const System = require('../../models/System')





//Get Active  MAPs by system
exports.getActiveMapsBySys = async function (req, res) {
  try {
    const docs = await MAP.find({ active: true, system: req.params.id }).populate("monitoringAct").lean().exec();
    if (!docs) {
      return res.status(401).json({ message: "MAP not found " }).end()
    }
    return res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};





//Add MAP
exports.addMap = async function (req, res) {
  try {
    const doc = await MAP.create({ ...req.body });
    businessControllers.addMAPtoSys(doc._id, doc.system)
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Get MAP by Id
exports.getMapById = async function (req, res) {
  try {
    const doc = await MAP.findOne({ _id: req.params.id }).lean().exec();

    if (!doc) {
      return res.status(401).json({ message: "MAP not found " }).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Update map
exports.updateMap = async function (req, res) {
  try {
    const updatedDoc = await MAP.findOneAndUpdate({ _id: req.params.id, }, req.body, { new: true }).lean().exec();

    if (!updatedDoc) {
      const err = { res: "error", error: { message: "planification not found ", }, };
      return res.status(400).json(err).end()
    }


    if (!updatedDoc.active) {
      const system = await System.findOne({ _id: updatedDoc.system }).lean().exec();
      updatedListMap = []
      system.listMap.forEach(mapId => {
        if (req.params.id.toString() !== mapId.toString()) { updatedListMap.push(mapId) }
      });
      const updatedsys = await System.findOneAndUpdate({ _id: updatedDoc.system }, { ...system, listMap: updatedListMap },
        { new: true }).lean().exec();
    }

    res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};


//Get All MAPs
exports.getAllMaps = async function (req, res) {
  try {
    const docs = await MAP.find({ Deleted_at: null }).lean().exec();
    if (!docs) {
      return res.status(401).json({ message: "MAP not found " }).end()
    }
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};



//Delete MAP
exports.deleteMap = async function (req, res) {


  try {
    MAP.updateOne(
      { _id: req.params.id },
      {
        $set: { active: false },
      }
    )
      .lean()
      .exec();
    return res.status(200).json({ message: "MAP deleted" });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

//Get deleted MAPs
exports.getDeletedMaps = async function (req, res) {
  try {
    const docs = await MAP.find({ Deleted_at: { $ne: null } })
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
