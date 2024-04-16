const System = require("../../models/System");
const mongoose = require("mongoose");
const Type = require("../../models/Type");

module.exports = async (systemId, searchValue) => {
  try {
    const myArray = searchValue?.split(" ");
    const searchArray = [
      {
        $or: [
          {
            "contact.lastName": {
              $regex: "",
              $options: "i",
            },
          },
          {
            "contact.mail": {
              $regex: "",
              $options: "i",
            },
          },
        ],
      },
    ];

    myArray?.map((searchFragment) => {
      searchArray.push({
        $or: [
          {
            "contact.lastName": {
              $regex: searchFragment,
              $options: "i",
            },
          },
          {
            "contact.mail": {
              $regex: searchFragment,
              $options: "i",
            },
          },
        ],
      });
    });

    let doc = await System.aggregate([
      {
        $match: {
          _id:mongoose.Types.ObjectId(systemId),
        },
      },
      {
        $project: {
          listCustomerContact: 1,
        },
      },
      {
        $unwind: {
          path: "$listCustomerContact",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "customercontacts",
          localField: "listCustomerContact",
          foreignField: "_id",
          as: "customerContact",
        },
      },
      {
        $set: {
          contact: {
            $arrayElemAt: ["$customerContact", 0],
          },
        },
      },
      {
        $match: {
          $and: searchArray,
        },
      },
      {
        $project: {
          _id: 0,
          contact: 1,
        },
      },
    ]);

doc = doc?.map((element) => {
return element.contact
})

    if (doc.length === 0) {
      return {
        err: { message: "System not found." },
        status: "error",
        statusCode: 204,
      };
    }
    
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
