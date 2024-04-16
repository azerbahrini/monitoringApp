const System = require('../../models/System')
const Host = require('../../models/Host')
const Client = require('../../models/Client')
const businessControllers = require('./systemBusiness');

//Add System
exports.addSystem = async function (req, res) {

  try {
    sys=req.body
    
    const host =   await Host.create({host:sys.listHost[0] })
    const client = await Client.create({clientNumber:sys.listClient[0] })
    
    sys={...sys,listClient:[client._id],listHost:[host._id]}
    
    const doc = await System.create({ ...sys})
   
      res.status(201).json({ data: doc })
      businessControllers.linkSystemCustomer(doc._id,req.body.customer) 

  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}



//Get System by Id
exports.getSystemById = async function (req, res) {
  try {
    const doc = await System
      .findOne({ _id: req.params.id })
      .populate("type")
      .populate("category")
      .populate("customer")
      .populate("class") 
      .populate(
        {
          path: 'listClient',
          match: { deleted_at : { $exists : false } }
      })
      .populate(
        {
          path: 'listHost',
          match: { deleted_at : { $exists : false } }
      })
      .lean()
      .exec()

    if (!doc) {
      return res.status(401).json({ message: "System not found " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Get System by System
exports.getSystemBySystem = async function (req, res) {
  try {
    const doc = await System
      .find({ "system": new RegExp(req.params.system , 'i') })
      .lean()
      .exec()

    if (!doc) {
      return res.status(401).json({ message: "System not found " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Get All Systems
exports.getAllSystems = async function (req, res) {
  try {
    const docs = await System
      .find({"Deleted_at": null})
      .populate({path:"listMap",populate:{path:"monitoringAct"}}) 
      .populate("customer","libelle") 
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Update System
exports.updateSystem = async function (req, res) {

  try {
    const updatedDoc = await System
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(401).json({ message: "System not found " }).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Delete System
exports.deleteSystem = async function (req, res) {

    const today = new Date();
    var date = ("0" + today.getFullYear()).slice(-4) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + ("0" + today.getDate()).slice(-2) + ' ' + ("0" + today.getHours()).slice(-2) + ':' + ("0" + today.getMinutes()).slice(-2) + ':' + ("0" + today.getSeconds()).slice(-2) + ':' + ("0" + today.getUTCMilliseconds()).slice(-2);

  try {
    
    System.updateOne(
        { _id: req.params.id },
        {
          $set: { "Deleted_at": date },
        }
     )
        .lean()
        .exec()      
    return res.status(200).json({ message: "System deleted" })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Get 1 Page of Systems
exports.getPageSystems = async function (req, res) {

  try {
    const docs = await System
      .find({"Deleted_at": null}).skip((parseInt(req.params.page)-1)*parseInt(req.params.limit)).limit(parseInt(req.params.limit))
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Get deleted Systems
exports.getDeletedSystems = async function (req, res) {

  try {
    const docs = await System
      .find({"Deleted_at": {$ne:null}})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
