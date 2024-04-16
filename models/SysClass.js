const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const classSchema = new Schema(
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

classSchema.plugin(mongoosePaginate);
const sysClass = mongoose.model("sysclasse", classSchema);

module.exports = sysClass;
