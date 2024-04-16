const mongoose = require("mongoose");
const Task = require("../../models/Task");
const moment = require('moment');
module.exports = async (
  userId,
  startDate,
  endDate
) => {
  try {
    const match = userId?
    {
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
        {
          assignee: mongoose.Types.ObjectId(userId)
        }
      ]
    }:
    {
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
        }
      ]
    }
    const tasks = await Task.aggregate([
      {
        $match: match
      },
      {
        $group: {
          _id: { state: "$state" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          state: '$_id.state',
          count: '$count'
        }
      }
    ]);
    const countsObject = tasks.reduce((a, v) => ({ ...a, [v.state]: v.count}), {});

    return { data: countsObject, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
