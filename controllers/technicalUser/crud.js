const TechnicalUser = require('../../models/TechnicalUser')
const System = require('../../models/System')
const Level = require('../../models/Level')


//Add TechnicalUser
exports.addTechnicalUser = async function (req, res) {

  try {
    const doc = await TechnicalUser.create({...req.body.user})
    let sys = await System.findOne({ _id:req.body.sys })
    sys.ListTechnicalUser.push(doc._id)
    const updatedDoc = await System
    .findOneAndUpdate(
      {
        _id: req.body.sys
      },
      sys,
      { new: true }
    )
    .lean()
    .exec()
      res.status(201).json({ data: doc })


  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}












//Get All TechnicalUsers
exports.getAllTechnicalUsers = async function (req, res) {
  try {
    const docs = await TechnicalUser
      .find({"Deleted_at": null})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Update TechnicalUsers
exports.updateTechnicalUser = async function (req, res) {

  try {
    const updatedDoc = await TechnicalUser
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
      return res.status(401).json({ message: "TechnicalUsers not found " }).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//Delete TechnicalUser
exports.deleteTechnicalUser = async function (req, res) {


    try {
      console.log(req.body.sysid)
       
        let sys = await System.findOne({ _id:req.body.sysid })
        
        if (!sys) {
          const err = { res: "error", error: {message: " TechnicalUser not found ",}, };
          return res.status(400).json(err).end()
        }

        let i=0
        sys.ListTechnicalUser.forEach(t=> {
         
            if(req.params.id .toString() === t.toString()){console.log(t); sys.ListTechnicalUser.splice(i,1);}
          i++
        });
        
        const updatedDoc = await System.findOneAndUpdate({_id: req.body.sysid},sys,{ new: true }).lean().exec()
        if (!updatedDoc) {
          const err = { res: "error", error: {message: " TechnicalUser not found ",}, };
          return res.status(400).json(err).end()
        }



        const docdel = await TechnicalUser.findOneAndRemove({
          _id: req.params.id
        })
    
        if (!docdel) {
          const err = { res: "error", error: {message: " TechnicalUser not found ",}, };
          return res.status(400).json(err).end()
        }

        return res.status(200).json({ message: "TechnicalUser deleted" })


      } catch (e) {
        console.error(e.message)
        res.status(400).end()
      }
}

