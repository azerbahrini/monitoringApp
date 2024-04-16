const mongoose = require("mongoose");
const Task = require("../../models/Task");
const moment = require('moment');
module.exports = async (
  userId,
  type,
  state,
  startDate,
  endDate,
  timeZone
) => {
  try {

      let Pending = [] ;
      let InProgress = [] ;
      let Completed = [] ;
      let Done = [] ;
      let Canceled = [] ;


    const taskDoc = await Task.aggregate([
      {
        $match: {
          assignee: mongoose.Types.ObjectId(userId),
        },
      },
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
        $match: {
              state: {
                $in: JSON.parse(state),
              },
             type:  {
              $in: JSON.parse(type),
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

    taskDoc.map((task) => {
      task.estimatedStart = moment(task.estimatedStart).tz(timeZone).format();
    });

    
    taskDoc.forEach(item =>{ if(item.state.toString() === "Pending"){
        Pending.push(item)
    }
    else if(item.state.toString() === "In progress"){
      InProgress.push(item)
    }
    else if(item.state.toString()=== "Completed"){
      Completed.push(item)
    }
    else if(item.state.toString() === "Done"){
      Done.push(item)
    }
    else {Canceled.push(item)}
})

    const workFlowColumns = [

        { name: "Pending", items: Pending },
        
        { name: "In progress", items: InProgress },
        
        { name: "Completed", items: Completed },
        
        { name: "Done", items: Done },
        
        { name: "Canceled", items: Canceled }
        
        ];
    if ( taskDoc.length === 0) {
      return {
        error: { message: "No Tasks found" },
        status: "no data",
        statusCode: 204,
      };
    }
    return { data:  workFlowColumns, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
