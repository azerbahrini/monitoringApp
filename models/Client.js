const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

//schema for client = mandant

const Clientschema = new Schema(
  {
    clientNumber: {
      type: String,
      required: true,
    },
    system: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "system",
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
Clientschema.plugin(mongoosePaginate);
const Client = mongoose.model("client", Clientschema);
module.exports = Client;
