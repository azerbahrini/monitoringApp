const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const customerSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },

    logo: String,

    isActive: {
      type: Boolean,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    firstReport: {
      type: String,
      required: true,
    },
    
    timeZone: [
      {
        type: String,
      },
    ],

    listMonitoringType: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "monitoringType",
      },
    ],

    contactsForReports: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "user",
      },
    ],
  },

  {
    timestamps: true,
  }
);

customerSchema.plugin(mongoosePaginate);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
