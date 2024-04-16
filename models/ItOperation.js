const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const itOperationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    timeZone: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    oldStartDate: {
      type: Date,
      default: null,
    },

    oldEndDate: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    canceledAt: {
      type: Date,
      default: null,
    },

    postponedAt: {
      type: Date,
      default: null,
    },

    extendedAt: {
      type: Date,
      default: null,
    },

    remindedAt: {
      type: Date,
      default: null,
    },

    changesNotSaved: [
      {
        type: String,

        enum: [
          "created",
          "updated",
          "postponed",
          "extended",
          "canceled",
          "finished",
        ],
      },
    ],

    status: {
      type: String,

      enum: ["active", "archived"],

      default: "active",
    },

    type: {
      type: String,

      enum: ["planned", "unplanned"],
    },

    systemDownStart: {
      type: Date,
      default: null,
    },

    systemDownEnd: {
      type: Date,
      default: null,
    },

    oldsystemDownStart: {
      type: Date,
      default: null,
    },

    oldsystemDownEnd: {
      type: Date,
      default: null,
    },

    spoc: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "user",
    },
    canceledNotes: {
      type: String,
      default: null,
    },

    postponedN: {
      type: String,
      default: null,
    },
    extendedN: {
      type: String,
      default: null,
    },
    ticket: {
      type: String,
      required: true,
    },

    listContact: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "customerContact",
      },
    ],

    system: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "system",
    },
  },

  {
    timestamps: true,
  }
);

itOperationSchema.plugin(mongoosePaginate);

const ItOperation = mongoose.model("itOperation", itOperationSchema);

module.exports = ItOperation;
