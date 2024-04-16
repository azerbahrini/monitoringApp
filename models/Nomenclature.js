const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const nomenclatureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    theme: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

nomenclatureSchema.plugin(mongoosePaginate);
const nomenclature = mongoose.model("nomenclature", nomenclatureSchema);

module.exports = nomenclature;
