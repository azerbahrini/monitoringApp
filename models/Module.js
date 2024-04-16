const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const moduleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },

    isBasic: {
      type: Boolean,
      default: false
    },

    listPermission: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "permission",
      }
    ]
  },

  {
    timestamps: true,
  }
);

moduleSchema.plugin(mongoosePaginate);

const Module = mongoose.model("module", moduleSchema);

module.exports = Module;
