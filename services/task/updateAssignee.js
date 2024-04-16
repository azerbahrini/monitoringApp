const Task = require("../../models/Task");
module.exports = async (body, toUpdate) => {
  try {
    let taskIDs = []
    body.taskObjects.forEach(element => {
      taskIDs = [...taskIDs, element.taskId]
    });

    const taskDocument = await Task.updateMany(
      {
        _id: { $in: taskIDs }
      },
      toUpdate
    )
      .lean()
      .exec();

    let taskSearchResult = [];
    const getUpdatedTask = await Task.find({ _id: { $in: taskIDs } })
      .lean()
      .exec();

    getUpdatedTask.map((task) => {
      if (task.state !== "Canceled" && body.toCancel) {
        taskSearchResult.push({
          taskName: task.title,
          task_id: task._id,
          estimatedStart: task.estimatedStart,
        });
      } else if ((task.assignee.toString() !== body.assigneeId)&& !body?.toCancel) {
        taskSearchResult.push({
          taskName: task.title,
          task_id: task._id,
          estimatedStart: task.estimatedStart,
        });
      }
    });

    if (taskDocument?.n === 0) {
      return {
        err: { message: "Task not found." },
        status: "error",
        statusCode: 204,
      };
    }

    if (taskSearchResult.length > 0) {
      return {
        data: taskSearchResult,
        err: { message: "Not All Tasks Updated." },
        status: "incomplete",
        statusCode: 400,
      };
    }

    return { data: taskDocument, status: "success" };
  } catch (err) {
    return { err, status: "error" };
  }
};
