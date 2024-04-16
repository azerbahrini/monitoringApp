const Task = require("../../models/Task");
module.exports = async (id, body, execute) => {
  try {
    if (execute) {
      const TaskDocument = await Task.findOneAndUpdate(
        {
          _id: id,
        },
        body,
        { new: true }
      )
        .lean()
        .exec();

      if (!TaskDocument) {
        return {
          err: { message: "Task not found." },
          status: "error",
          statusCode: 404,
        };
      }
      return { data: TaskDocument, status: "success" };
    }
    else {
      return {
        err: { message: "You are not authorized to perform this action" },
        status: "error",
        statusCode: 401,
      }
    }

  } catch (err) {
    return { err, status: "error" };
  }
};
