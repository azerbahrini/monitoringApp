const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const monitoringActSchema = new Schema(
  {
    activity: String,
    type: String,
    description: String,
    isActive: {
      type: Boolean,
      required: true,
    }
  },

  {
    timestamps: true,
  }
);
monitoringActSchema.plugin(mongoosePaginate);
const MonitoringAct = mongoose.model("monitoringAct", monitoringActSchema);

module.exports = MonitoringAct;
