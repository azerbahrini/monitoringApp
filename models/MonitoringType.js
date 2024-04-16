const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const monitoringTypeSchema = new Schema(
  {
    libelle: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

monitoringTypeSchema.plugin(mongoosePaginate);
const MonitoringType = mongoose.model("monitoringType", monitoringTypeSchema);

module.exports = MonitoringType;
