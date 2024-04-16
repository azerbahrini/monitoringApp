const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const CustomerContactschema = new Schema(
  {
    lastName: {
      type: String,
      required: true,
    },

    mail: {
      type: String,
      required: true,
    },

    phoneNumber: { type: Number },

    customer: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "customer",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  {
    timestamps: true,
  }
);
CustomerContactschema.plugin(mongoosePagination);
const CustomerContact = mongoose.model(
  "customerContact",
  CustomerContactschema
);

module.exports = CustomerContact;
