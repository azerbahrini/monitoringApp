const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const roleSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    listModule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "module",
      },
    ],
    rank: {
      type: Number,
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

roleSchema.plugin(mongoosePaginate);
const Role = mongoose.model("role", roleSchema);

module.exports = Role;
