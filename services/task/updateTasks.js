const Task = require('../../models/Task');
//const io = require('../../socket');
//const io = require("../../server");
const producer = require('../../kafka/kafkaPoducer');
const logger = require('./../../config/logger')

module.exports = async (id, body) => {
  try {
    const TaskDocument = await Task.findOneAndUpdate(
      {
        _id: id
      },
      body
    )
      .lean()
      .exec();

    if (!TaskDocument) {
      return {
        err: { message: 'Task not found.' },
        status: 'error',
        statusCode: 404
      };
    }
    if (TaskDocument.state !== body.state) {
      const taskState = {
        taskId: id,
        oldState: TaskDocument.state,
        newState: body.state,
        user: TaskDocument.assignee
      };
     // io.getIO().emit(TaskDocument.assignee, 'task-state-changed', taskState);
     //io.server.io.emit(TaskDocument.assignee, 'task-state-changed', taskState);
     logger.debug('Before sending Info !!')
     producer.sendInfo(taskState);

    }
    return { data: TaskDocument, status: 'success' };
  } catch (err) {
    console.log(err.message);
    return { err, status: 'error' };
  }
};
