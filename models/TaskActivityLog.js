const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const taskActivityLogSchema = new Schema(
  {
    result: [{}],
    shift: {
      name: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true }
    }
  }
);
taskActivityLogSchema.plugin(mongoosePaginate);

const Task = mongoose.model('taskactivitylog', taskActivityLogSchema);

module.exports = Task;
