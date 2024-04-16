const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const taskStatisticsHistorySchema = new Schema(
  {
    result: [{}],
  },
  {
    timestamps: true,
  }
);
taskStatisticsHistorySchema.plugin(mongoosePaginate);

const Task = mongoose.model(
  "taskStatisticsHistory",
  taskStatisticsHistorySchema
);

module.exports = Task;
