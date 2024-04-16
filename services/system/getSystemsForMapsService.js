const System = require("../../models/System");
const mongoose = require("mongoose");

module.exports = async (customerId, typeId, categoryId, systemId) => {
  try {
    const filtering = { isActive: true };
    customerId && (filtering.customer =  mongoose.Types.ObjectId(customerId));
    typeId && (filtering.type =  mongoose.Types.ObjectId(typeId));
    categoryId && (filtering.category =  mongoose.Types.ObjectId(categoryId));
    systemId && (filtering._id =  mongoose.Types.ObjectId(systemId));
    const aggregate = [
      {
        $match: filtering
      },
      {
      $lookup: {
        from: 'customers',
        localField: 'customer',
        foreignField: '_id',
        as: 'populatedCustomer'
      }
    }, {
      $set:
      {
        "CustomerStatus": {
          "$arrayElemAt": ["$populatedCustomer.isActive", 0]
        }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'populatedCategory'
      }
    }, {
      $set:
      {
        "CategoryStatus": {
          "$arrayElemAt": ["$populatedCategory.isActive", 0]
        }
      }
    },
    {
      $lookup: {
        from: 'types',
        localField: 'type',
        foreignField: '_id',
        as: 'populatedType'
      }
    }, {
      $set:
      {
        "TypeStatus": {
          "$arrayElemAt": ["$populatedType.isActive", 0]
        }
      }
    },
     {
      $match: {
        CustomerStatus: true,
        CategoryStatus : true,
        TypeStatus : true
      }
    }, {
      $project: {
        name: 1
      }
    }];
    const systems = await System.aggregate(aggregate);
    return { data: systems, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
