const Role = require('../../models/Role');
const RoleHistory= require('../../models/RoleHistory');








exports.addRoleHistory = async function (req, res) {


    try {
      const doc = await RoleHistory.create({ ...req.body })
  
        res.status(201).json(doc )
  
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  exports.getAllRoleHistory = async function (req, res) {
    try {
      const docs = await RoleHistory
        .find({})
        .populate("Role")
        .populate("user","firstName")
        .populate("user","lastName")
        .lean()
        .exec()
  
      res.status(200).json(docs)
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
