const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const systemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "type",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "category",
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "customer",
      required: true,
    },

    /* listMap: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "map",
      },
    ], */

    class: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "sysclass",
      required: true,
    },

    deployType: {
      type: String,
      enum: ["Cloud", "On-Premise"],
    },
    deployDesc: String,

    fqdn: String,

    listTechnicalUser: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "technicaluser",
      },
    ],
    listCustomerContact: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "customerContact",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

systemSchema.plugin(mongoosePaginate);

const System = mongoose.model("system", systemSchema);

module.exports = System;
