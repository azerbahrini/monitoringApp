//Model Object
const Task = require("../../models/Task");
var moment = require("moment-timezone");
module.exports = async (
  searchValue,
  type,
  state,
  startDate,
  endDate,
  timeZone
) => {
  try {
    const myArray = searchValue?.split(" ");
    const searchArray = [
      {
        $or: [
          {
            title: {
              $regex: "",
              $options: "i",
            },
          },
          {
            customerName: {
              $regex: "",
              $options: "i",
            },
          },
          {
            assigneeName: {
              $regex: "",
              $options: "i",
            },
          },
          {
            systemName: {
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
            title: {
              $regex: searchFragment,
              $options: "i",
            },
          },
          {
            customerName: {
              $regex: searchFragment,
              $options: "i",
            },
          },
          {
            assigneeName: {
              $regex: searchFragment,
              $options: "i",
            },
          },
          {
            systemName: {
              $regex: searchFragment,
              $options: "i",
            },
          },
        ],
      });
    });

    const doc = await Task.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "assignee",
          foreignField: "_id",
          as: "populatedUser",
        },
      },
      {
        $set: {
          assigneeName: {
            $concat: [
              {
                $arrayElemAt: ["$populatedUser.firstName", 0],
              },
              " ",
              {
                $arrayElemAt: ["$populatedUser.lastName", 0],
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "systems",
          localField: "system",
          foreignField: "_id",
          as: "populatedSystem",
        },
      },
      {
        $set: {
          systemName: {
            $arrayElemAt: ["$populatedSystem.name", 0],
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "populatedSystem.customer",
          foreignField: "_id",
          as: "populatedCustomer",
        },
      },
      {
        $set: {
          customerName: {
            $arrayElemAt: ["$populatedCustomer.label", 0],
          },
        },
      },
      {
        $match: {
          $and: searchArray,
        },
      },
      {
        $match: {
 
              state: {
                $in: JSON.parse(state),
              },
            },
         
      },
      {
        $match: {
          type: {
            $in: JSON.parse(type),
          }
        },
      },
      {
        $match: {
          $and: [
            {
              estimatedStart: {
                $lte: new Date(moment(endDate).utc()),
              },
            },
            {
              estimatedStart: {
                $gte: new Date(moment(startDate).utc()),
              },
            },
          ],
        },
      },
      {
        $project: {
          populatedUser: 0,
          populatedSystem: 0,
          populatedCustomer: 0,
        },
      },
    ]);
   
    doc.map((task) => {
      task.estimatedStart = moment(task.estimatedStart).tz(timeZone).format();
    });

    if (doc.length === 0) {
      return {
        error: {message : "No Tasks found" },
        status: "no data",
        statusCode: 204,
      };
    }
    return { data: doc, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
