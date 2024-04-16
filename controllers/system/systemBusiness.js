const Customer = require('../../models/Customer')
const Category = require('../../models/Category')
const System = require('../../models/System')
const { find } = require('../../models/Customer')


//link mandant by customer
exports.linkSystemCustomer= async function (systemid,customerid) {
  try {
    const doc = await Customer
      .findOne({ _id: customerid })
      .lean()
      .exec()
      doc.listSystem.push(systemid)

      const updatedDoc = await Customer
      .findOneAndUpdate(
        {
          _id: customerid
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

//get system MAP list
exports.getMapList= async function (req,res){
  try {
    const doc = await System.find({_id: req.params.id}).lean().select('listMap').select('-_id').populate('listMap').exec()
    return res.status(200).json({ data: doc })
  }
    catch(err){
      console.error(err)
      res.status(400).end()
    }
}