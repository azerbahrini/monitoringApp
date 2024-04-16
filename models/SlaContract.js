const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const slaContractSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer'
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sysclasse',
      required: true
    }
  },

  {
    timestamps: true
  }
);

slaContractSchema.plugin(aggregatePaginate);
const SlaContract = mongoose.model('slaContract', slaContractSchema);

module.exports = SlaContract;
