const Task = require("../../models/Task");
const ObjectId = require("mongodb").ObjectId;
const getByTaskId = require("../../services/result/getByTaskId");

module.exports = async (taskId) => {
  try {
    const map = await Task.aggregate([
      {
        $match: {
          _id: new ObjectId(taskId),
        },
      },
      {
        $project: {
          map: 1,
          _id: 0,
        },
      },
    ]);
    if (map[0]) {
      const mapID = map[0].map;
      const taskList = await Task.aggregate([
        {
          $match: {
            map: new ObjectId(mapID),
            state: "Done",
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      if (taskList?.length>0) {
        const lastTaskID = taskList[0]._id;
        const lastResult = await getByTaskId(lastTaskID);
        if (lastResult.status == "success") {
          if (lastResult.data) {
            return {
              data: lastResult.data,
              status: lastResult.status,
              statusCode: lastResult.statusCode,
            };
          } else {
            return {
              data: [],
              status: lastResult.status,
              statusCode: 204,
            };
          }
        } else {
          return {
            statusCode: lastResult.statusCode,
            err: { message: lastResult.err.message },
            status: lastResult.status,
          };
        }
      } else {
        return {
          err: { message: "Failed to get the map tasks" },
          status: "error",
          statusCode: 400,
        };
      }
    } else {
      return {
        err: { message: "No Task Can be found with this ID." },
        status: "error",
        statusCode: 404,
      };
    }
  } catch (err) {
    return { err, status: "error", statusCode: 400 };
  }
};
