const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const paginate = require('mongoose-paginate-v2');

const monitoringActPlanSchema = new Schema(
  {
    periodicity: {
      type: Number
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    estimation: {
      type: Number
    },
    startTime: {
      type: Number,
      required: true
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task'
    },

    system: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'system',
      required: true
    },

    monitoringAct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'monitoringAct',
      required: true
    }
  },
  {
    timestamps: true
  }
);

monitoringActPlanSchema.plugin(paginate);
monitoringActPlanSchema.plugin(aggregatePaginate);
const MAP = mongoose.model('map', monitoringActPlanSchema);

module.exports = MAP;
