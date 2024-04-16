const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
//Schema for host

const Hostschema = new Schema(
  {
    host: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    system: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "system"
    },
  },

  {
    timestamps: true,
  }
);

Hostschema.plugin(mongoosePaginate);
const Host = mongoose.model("host", Hostschema);
module.exports = Host;
