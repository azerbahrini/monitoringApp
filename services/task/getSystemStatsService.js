const Task = require("../../models/Task");
const systemService = require("../system");
const mapService = require("../map");
const virtualTasksGeneratorService = require("./virtualTasksGenerator");
const TaskStatisticsHistoryService = require("../../services/TaskStatisticsHistory");

function getSystemsWithoutDuplicate(array) {
  const systems = array.map((item) => JSON.stringify(item.system));
  return [...new Set(systems)].map((item) => {
    return JSON.parse(item);
  });
}

function calculateSystemOccurence(array, system) {
  return array.reduce(
    (a, v) => (v.system._id.toString() === system.toString() ? a + 1 : a),
    0
  );
}

module.exports = async (
  startDate,
  endDate,
  timeZone,
  userId,
  customerIDFilter
) => {
  try {
    const systems = await systemService.getSystemsForMapsService(
      customerIDFilter ? customerIDFilter : undefined
    );
    // array of system IDs
    const systemsIDs = systems.data.map((system) => system._id);
    const mapsFromSystems = await mapService.getMapsBySystems(systemsIDs);
    //  generatedTasks == total tasks
    const generatedTasks = virtualTasksGeneratorService(
      mapsFromSystems.data,
      startDate,
      endDate,
      userId,
      timeZone
    );
    const dbTasks = await Task.aggregate([
      {
        $match: {
          $and: [
            {
              estimatedStart: {
                $lt: new Date(endDate),
              },
            },
            {
              estimatedStart: {
                $gt: new Date(startDate),
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          system: 1,
        },
      },
      {
        $lookup: {
          from: "systems",
          localField: "system",
          foreignField: "_id",
          as: "system",
        },
      },
      {
        $unwind: {
          path: "$system",
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "system.customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
        },
      },
      {
        $set: {
          customer: "$customer.label",
          taskId: "$_id",
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    const uniqueGeneratedTasks = getSystemsWithoutDuplicate(generatedTasks.data);
    let total = uniqueGeneratedTasks.map((item) => {
      let virtualOccurence = calculateSystemOccurence(generatedTasks.data, item._id);
      let databaseOccurence = calculateSystemOccurence(dbTasks, item._id);
      return {
        systemName: item.name,
        customerName: item.customer.label,
        targetTasks: virtualOccurence,
        createdTasks: databaseOccurence,
      };
    });
    if (total.length > 0) {
      // saving the result in the database
      const saveResult = await TaskStatisticsHistoryService.saveTaskStats(total);
      if (saveResult.status === "success") {
        return { data: total, status: "success", code: saveResult.code };
      } else {
        return {
          err: { message: "Failed to save the data" },
          status: "error",
          code: saveResult.code,
        };
      }
    } else {
      return {
        err: { message: "No data can be found." },
        code: 404,
        status: "error",
      };
    }
  } catch (err) {
    return { err, status: "error", code: 400 };
  }
};
