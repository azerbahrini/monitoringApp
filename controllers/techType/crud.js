const TechType = require('../../models/TechType');

exports.addTechType = async function (req, res) {
  const token = req.header("x-auth-token");
  // if (!token) {
  //   return res.sendStatus(401);
  // }
    try {
      const doc = await TechType.create({ ...req.body })
      res.status(201).json(doc )
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

exports.getAllTechTypes = async function (req, res) {
    try {
      const docs = await TechType
        .find({})
        .lean()
        .exec()
      res.status(200).json(docs)
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
