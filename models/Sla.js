const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const slaSchema = new Schema(
  {
    kpi: {
      type: String,
      enum: ["escalation", "response", "takeOver", "resolution"],
      required: true,
    },
    unity: {
      type: String,
      enum: ["second", "minute", "hour", "day"],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    slaContract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "slaContract",
    },
    priority: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);
slaSchema.plugin(mongoosePaginate);
const Sla = mongoose.model("sla", slaSchema);

module.exports = Sla;
